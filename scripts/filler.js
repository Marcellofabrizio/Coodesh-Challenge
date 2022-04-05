/**
 * A script to fill the database with already existing articles
*/

const axios = require('axios');
const mongoose = require('mongoose');
const pino = require('pino')

const apiUrl = 'https://api.spaceflightnewsapi.net/v3'

const Article = require('../models/Article.js');

const logger = pino({
    prettyPrint: {
        ignore: "pid,hostname",
    },
}, pino.destination("articles-cron.log"));

async function registerArticle(responseArticle) {

    return new Promise((resolve, reject) => {

        const {
            id,
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
            _id: id,
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
                logger.info(`Article ${id} saved successfully`)
                resolve();
            })

        } catch (err) {
            logger.error(err.message);
        }

    })
}

async function register() {
    await mongoose.connect("mongodb+srv://MarcelloFabrizio:EspacialMongo@cluster0.gwwrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",)
    const db = mongoose.connection;

    db.on('error', (error) => logger.error(error));
    db.once('open', () => logger.info('Database connection established'));

    await axios.get(`${apiUrl}/articles/count`).then((response) => {
        total = response.data
    });
    var skip = 0;
    const limit = 50;


    while (skip < total) {
        const response = await axios.get(`${apiUrl}/articles`, {
            params: {
                _limit: limit,
                _start: skip
            }
        })
        await Promise.all(response.data.map(async (article) => {
            await registerArticle(article);
        })).then(() => {
            skip += limit;
        }).finally(() => {

        })
    }

    if(skip > total) {
        db.close();
    }
}

register();