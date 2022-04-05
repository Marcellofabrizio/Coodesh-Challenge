const axios = require('axios');
const mongoose = require('mongoose');
const pino = require('pino')

const apiUrl = 'https://api.spaceflightnewsapi.net/v3'

const Article = require('../models/Article.js');

const logger = pino({
    prettyPrint: {
        ignore: "pid,hostname",
    },
}, pino.destination("articles-sync.log"));

async function registerArticle(responseArticle) {

    return new Promise((resolve, reject) => {

        const {
            _id,
            featured,
            title,
            url,
            imageUrl,
            newsSite,
            summary,
            publishedAt,
            launches,
            events
        } = responseArticle;

        const article = new Article({
            _id: _id,
            featured,
            title,
            url,
            imageUrl,
            newsSite,
            summary,
            publishedAt,
            launches,
            events
        })

        try {
            article.save().then(() => {
                resolve();
            })

        } catch (err) {
            reject(err);
        }

    })
}

async function getArticlesCount() {

    return axios.get(`${apiUrl}/articles/count`)

}

async function getRegisteredArticlesCount() {

    return Article.count();

}

async function syncArticles() {
    await mongoose.connect("mongodb+srv://MarcelloFabrizio:EspacialMongo@cluster0.gwwrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",)

    var total = 0;
    var registeredTotal = 0;
    const limit = 50;

    await getArticlesCount().then((response) => {
        total = response.data
    });
    registeredTotal = await getRegisteredArticlesCount();

    if (total > registeredTotal) {

        while (total > registeredTotal) {
            const response = await axios.get(`${apiUrl}/articles`, {
                params: {
                    _limit: limit,
                    _start: registeredTotal
                }
            })
            await Promise.all(response.data.map(async (article) => {
                await registerArticle(article);
                logger.info("Article saved successfully");
            })).then(() => {
                registeredTotal += limit;
            }).catch((error) => {
                logger.error(error.message);
            })
        }
    }

    if (registeredTotal >= total) {
        logger.info("Sem novos artigos para adicionar");
    }
}

module.exports = { syncArticles }