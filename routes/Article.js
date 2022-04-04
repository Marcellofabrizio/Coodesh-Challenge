const express = require('express');
const router = express.Router();

const { postArticle, getArticles } = require('../controllers/Article.js');

router.get('/articles', async (request, response) => {
    await getArticles(request, response);
})

router.post('/articles', async (request, response) => {
    await postArticle(request, response);
})

module.exports = router;