const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cron = require('node-cron');

const app = express();

const swaggerDocument = require('../swagger.json');
const articleRoutes = require('../routes/Article.js');
const { logger } = require('../utils/logger.js');
const { syncArticles } = require('../scripts/cronJob.js')


app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(articleRoutes);

// Cron scheduled to execute the syncronization every day at 9 am
// cron.schedule("0 9 * * *", () => {
//     logger.info("Checking for new articles...");
//     syncArticles()
// });

app.get('/', (request, response) => {
    response.send("Back-end Challenge 2021 🏅 - Space Flight News")
})

module.exports = { app }