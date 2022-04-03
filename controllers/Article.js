
const Article = require('../models/Article.js');

async function getArticles(request, response) {
    try {
        const articles = await Article.find();
        response.status(200).json(articles);
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
}

async function postArticle(request, response) {
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
    } = request.body

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
        const newArticle = await article.save();
        response.status(201).json(newArticle);

    } catch (err) {
        response.status(500).json({ error: err.message });
    }
}

module.exports = { getArticles, postArticle };