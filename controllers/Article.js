const Article = require('../models/Article.js');

async function getArticles(request, response) {

    const {
        limit,
        skip
    } = request.query

    try {
        const articles = await Article.find().limit(limit).skip(skip);
        response.status(200).json(articles);
    } catch (err) {
        response.status(500).json({
            error: err.message
        });
    }
}

async function getArticlesCount(request, response) {
    try {
        const count = await Article.count();
        response.status(200).json({
            count: count
        });
    } catch (err) {
        response.status(500).json({
            error: err.message
        });
    }
}

async function getArticleById(request, response) {
    const id = request.params.id;

    try {
        const article = await Article.findById(id);

        if (article == null) {
            response.status(400).json({
                error: 'Article not found'
            });
            return;
        }
        response.status(200).json(article)

    } catch (err) {
        response.status(500).json({
            error: err
        })
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
        response.status(500).json({
            error: err.message
        });
    }
}

async function deleteArticle(request, response) {
    const id = request.params.id;

    try {
        const article = await Article.findByIdAndRemove(id);

        if (article == null) {
            response.status(400).json({
                error: 'Article not found'
            });
            return;
        }
        response.status(200).json({
            message: 'Article deleted successfully'
        });

    } catch (err) {
        response.status(500).json({
            error: err
        })
    }
}

module.exports = {
    getArticles,
    postArticle,
    getArticlesCount,
    getArticleById,
    deleteArticle
};