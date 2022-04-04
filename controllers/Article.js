const Article = require('../models/Article.js');
const mongoose = require('mongoose');

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

        await article.validate()

        const newArticle = await article.save();
        response.status(201).json(newArticle);

    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            response.status(400).json({
                error: err.message
            });
        } else {
            response.status(500).json({
                error: err.message
            });
        }
    }
}

async function putArticle(request, response) {

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
    } = request.body;

    try {

        const updatedArticle = new Article({
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
        })

        console.log(_id)

        await updatedArticle.validate()

        await Article.updateOne({ _id: _id }, updatedArticle)

        response.status(200).json(updatedArticle)

    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            response.status(400).json({
                error: err.message
            });
        } else {
            response.status(500).json({
                error: err.message
            });
        }
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
    deleteArticle,
    putArticle
};