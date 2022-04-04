const axios = require('axios');
const mongoose = require('mongoose');

const apiUrl = 'https://api.spaceflightnewsapi.net/v3'

const Article = require('../models/Article.js');

async function getArticlesCount() {

    return axios.get(`${apiUrl}/articles/count`)

}