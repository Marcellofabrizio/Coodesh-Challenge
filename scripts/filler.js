/**
 * A script to fill the database with already existing articles
*/

const axios = require('axios');
const mongoose = require('mongoose');

const apiUrl = 'https://api.spaceflightnewsapi.net/v3'

const Article = require('../models/Article.js');

async function getArticlesCount() {

    await axios.get(`${apiUrl}/articles/count`).then((response) => {
        console.log(response.data);
    })

}

async function getArticles() {

    await axios.get(`${apiUrl}/articles`, {
        params: {
            _limit: 50
        }
    }).then((response) => {
        console.log(response.data);
        response.data.forEach((article) => {
            registerArticle(article);
        })
    })

}

async function registerArticle(responseArticle) {

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
    })

    try {
        await article.save().then(() => {
            console.log("article created")
        })

    } catch (err) {
        console.log(err.message);
    }

}

mongoose.connect("mongodb+srv://MarcelloFabrizio:EspacialMongo@cluster0.gwwrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",)
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database connection established'));
getArticles();

