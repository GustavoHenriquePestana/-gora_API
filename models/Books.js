const mongoose = require('mongoose')

const Books = mongoose.model('Books', {
    title: String,
    author: String,
    category: String,
    publication: String,
    pages: String,
    image: String,
})
module.exports = Books