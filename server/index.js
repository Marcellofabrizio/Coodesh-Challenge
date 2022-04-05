const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();

const swaggerDocument = require('../swagger.json');
const articleRoutes = require('../routes/Article.js');


app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(articleRoutes);

app.get('/', (request, response) => {
    response.send("Back-end Challenge 2021 🏅 - Space Flight News")
})

module.exports = { app }