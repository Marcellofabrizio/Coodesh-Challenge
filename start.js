const mongoose = require('mongoose');

const { app } = require('./server/index')
const { logger } = require('./utils/logger.js');

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://MarcelloFabrizio:EspacialMongo@cluster0.gwwrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",)
const db = mongoose.connection;

db.on('error', (error) => logger.error(error));
db.once('open', () => logger.info('Database connection established'));


app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
})