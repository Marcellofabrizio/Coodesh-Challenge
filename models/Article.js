const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    featured: {
        type: Boolean
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    newsSite: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    publishedAt: {
        type: String,
        required: true
    },
    launches: {
        type: Array
    },
    events: {
        type: Array
    },
})

module.exports = mongoose.model("Article", articleSchema);