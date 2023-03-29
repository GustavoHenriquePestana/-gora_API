const mongoose = require('mongoose')

const Rented = mongoose.model('Rented',{
    user_id: String,
    book_id: String,
    caught: String,
    devolution: String,

})

module.exports = Rented