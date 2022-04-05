const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cron = require('node-cron');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = require('../swagger.json');
const articleRoutes = require('../routes/Article.js');
const { logger } = require('../utils/logger.js');
const { cronJob } = require('../scripts/cronJob.js')

mongoose.connect("mongodb+srv://MarcelloFabrizio:EspacialMongo@cluster0.gwwrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",)
const db = mongoose.connection;

db.on('error', (error) => logger.error(error));
db.once('open', () => logger.info('Database connection established'));

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(articleRoutes);

cron.schedule("* * * * *", () => {
    logger.info("Checking for new articles...");
    cronJob()
});

app.get('/', (request, response) => {
    response.send("Back-end Challenge 2021 🏅 - Space Flight News")
})

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
})