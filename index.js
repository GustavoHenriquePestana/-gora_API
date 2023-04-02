//config inicial
require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const app = express()



//forma de ler json
app.use(
    urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//rotas da api
//rota user
const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

//rota donors
const donorsRoutes = require('./routes/donorsRoutes')
app.use('/donors', donorsRoutes)

//rota books
const booksRoutes = require('./routes/booksRoutes')
app.use('/books', booksRoutes)

// rota rented

const rentedRoutes = require('./routes/rentedRoutes')
app.use('/rented', rentedRoutes)

//rota author

const authorRoutes = require('./routes/authorRoutes')
app.use('/author', rentedRoutes)

//rotas iniciais
app.get('/', (req, res)=>{
    res.json({message: 'Oi Express!'})
})

//entregar porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@agoracluster.z8ih2r0.mongodb.net/?retryWrites=true&w=majority`
)
.then(()=>{
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err)=> console.log(err))