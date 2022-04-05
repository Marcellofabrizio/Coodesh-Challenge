const mongoose = require('mongoose');

const { app } = require('./server/index')
const { logger } = require('./utils/logger.js');

mongoose.connect(`mongodb+srv://${MONGODB_USR}:${MONGODB_PWD}@cluster0.gwwrw.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`,)
const db = mongoose.connection;

db.on('error', (error) => logger.error(error));
db.once('open', () => logger.info('Database connection established'));


app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
})