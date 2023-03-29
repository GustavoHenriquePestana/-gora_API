//config inicial
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
//rotas user
const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

//rotas donors
const donorsRoutes = require('./routes/donorsRoutes')
app.use('/donors', donorsRoutes)

//rotas iniciais
app.get('/', (req, res)=>{
    res.json({message: 'Oi Express!'})
})

//entregar porta

const DB_USER = 'gustavo'
const DB_PASSWORD = '2zJnD8gMeZ2LuwZY'

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@agoracluster.z8ih2r0.mongodb.net/?retryWrites=true&w=majority`
)
.then(()=>{
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err)=> console.log(err))