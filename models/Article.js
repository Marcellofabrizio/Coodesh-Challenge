const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    featured: {
        type: Boolean
    },
    title: {
        type: String
    },
    url: {
        type: String
    },
    imageUrl: {
        type: String
    },
    newsSite: {
        type: String
    },
    summary: {
        type: String
    },
    publishedAt: {
        type: String
    },
    launches: {
        type: Array
    },
    events: {
        type: Array
    },
}, {id: false})

module.exports = mongoose.model("Article", articleSchema);