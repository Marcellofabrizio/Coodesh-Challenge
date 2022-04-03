const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const articleRoutes = require('../routes/Article.js');

mongoose.connect("mongodb+srv://MarcelloFabrizio:EspacialMongo@cluster0.gwwrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",)
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database connection established'));

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use(articleRoutes);

app.get('/', (request, response) => {
    response.send("Back-end Challenge 2021 🏅 - Space Flight News")
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})