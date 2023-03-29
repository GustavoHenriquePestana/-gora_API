const mongoose = require('mongoose')

const Donors = mongoose.model('Donors', {
    name: String,
    email: String,
    cell: String,
    address: String,
    book_name: String,
})

module.exports = Donors