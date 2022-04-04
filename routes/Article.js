const express = require('express');
const router = express.Router();

const {
    postArticle,
    getArticles,
    getArticlesCount,
    getArticleById,
    deleteArticle,
    putArticle
} = require('../controllers/Article.js');

router.get('/articles', async (request, response) => {
    await getArticles(request, response);
})

router.get('/articles/count', async (request, response) => {
    await getArticlesCount(request, response);
})

router.get('/articles/:id', async (request, response) => {
    await getArticleById(request, response);
})

router.post('/articles', async (request, response) => {
    await postArticle(request, response);
})

router.put('/articles', async (request, response) => {
    await putArticle(request, response);
})


router.delete('/articles/:id', async (request, response) => {
    await deleteArticle(request, response);
})

module.exports = router;