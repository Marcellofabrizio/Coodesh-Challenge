const express = require('express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const mongoose = require('mongoose');

const { Client } = require('../data/index.js');
const { postArticle } = require('../controllers/Article.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


app.get('/', (request, response) => {
    response.send("Back-end Challenge 2021 🏅 - Space Flight News")
})

app.get('/articles', (request, response) => {
})

app.post('/article', async (request, response) => {
    await postArticle(request, response);
})

mongoose.connect("mongodb+srv://MarcelloFabrizio:EspacialMongo@cluster0.gwwrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",).then(() => {
    console.log('Conectou ao banco!')
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    })
}).catch((err) => console.log(err))