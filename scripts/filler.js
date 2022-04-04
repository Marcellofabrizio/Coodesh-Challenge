/**
 * A script to fill the database with already existing articles
*/

const axios = require('axios');
const mongoose = require('mongoose');

const apiUrl = 'https://api.spaceflightnewsapi.net/v3'

const Article = require('../models/Article.js');

async function getArticlesCount() {

    await axios.get(`${apiUrl}/articles/count`).then((response) => {
        return response.data;
    })

}

async function registerArticle(responseArticle) {

    return new Promise((resolve, reject) => {

        const {
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
            console.log(err.message);
        }

    })
}

async function register() {
    await mongoose.connect("mongodb+srv://MarcelloFabrizio:EspacialMongo@cluster0.gwwrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",)
    const db = mongoose.connection;

    db.on('error', (error) => console.log(error));
    db.once('open', () => console.log('Database connection established'));

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
            console.log(skip);
        }).finally(() => {

        })
    }

    if(skip > total) {
        db.close();
    }
}

register();