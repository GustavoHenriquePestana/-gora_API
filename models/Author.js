const mongoose = require('mongoose')

const Author = mongoose.model('Author', {
    name: String, 
    bio: String,
    nationality: String,
    bith: String,
})

module.exports = Author