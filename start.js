const mongoose = require('mongoose');
require('dotenv').config();

const { app } = require('./server/index')
const { logger } = require('./utils/logger.js');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USR}:${process.env.MONGODB_PWD}@cluster0.gwwrw.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,)
const db = mongoose.connection;

db.on('error', (error) => logger.error(error));
db.once('open', () => logger.info('Database connection established'));


app.listen(process.env.PORT, () => {
    logger.info(`Server listening on port ${process.env.PORT}`);
})