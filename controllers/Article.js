
const { Article } = require('../models/Article.js')

const getArticles = () => {

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

    const article = {
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
    }

    try {
        await Article.create(article);
        res.status(201).json({message: "Success"});

    } catch (err) {
        response.status(500).json({ error: err });
    }
}

module.exports = { getArticles, postArticle };