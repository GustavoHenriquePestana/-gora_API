const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    cell: String,
    address: String,
    historic: String,
})
module.exports = User