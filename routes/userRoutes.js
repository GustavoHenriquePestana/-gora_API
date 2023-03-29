const router = require('express').Router()
const User = require('../models/User')


router.post('/', async (req, res)=>{
    const{name, email, cell, address, historic } = req.body

    if(!name){
        res.status(422).json({error: 'o nome é obrigatório!'})
    }
    if(!email){
        res.status(422).json({error: 'o email é obrigatório!'})
    }
    if(!cell){
        res.status(422).json({error: 'o telefone é obrigatório!'})
    }
    if(!address){
        res.status(422).json({error: 'o endereço é obrigatório!'})
    }
    
    const user = {
        name,
        email,
        cell,
        address,
        historic,
    }
    try{
        //criar dados
        await User.create(user)
        res.status(201).json({ message: 'Usuário inserido com sucesso!'})
    }catch (error){
        res.status(500).json({ error: error})
    }
})

//READ - leitura de dados
router.get('/', async(req, res)=>{
    try{
        const people = await User.find()

        res.status(200).json(people)
    }catch(error){
        res.status(500).json({error: error})
    }
})

//Read por id

router.get('/:id', async (req, res) =>{
    
    const id = req.params.id
    try{
        const user = await User.findOne({_id: id})
        if(!user){
            res.status(422).json({ message: 'o usuário não foi encontrado '})
            return
        }
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({error: error})
    }
})

//Atualização Parcial - Patch
router.patch('/:id', async(req, res)=> {
    const id = req.params.id

    const{name, email, cell, address, historic } = req.body

    const user = {
        name,
        email,
        cell,
        address,
        historic,
    }
    try{
        const updatedUser = await User.updateOne({_id:id}, user)

        if(updatedUser.matchedCount ===0) {
            res.status(422).json({message: 'O usuário não foi encontrado'})
        }

        res.status(200).json(user)
    }catch{
        res.status(500).json({error: error}) 
    }
})

//Delete - deletando dados

router.delete('/:id', async (req, res) =>{
    const id = req.params.id

    const user = await User.findOne({_id:id})

    if(!user){
        res.status(422).json({message: 'o usuário não foi encontrado!'})
        return
    }
    try{
        await User.deleteOne({_id:id})
        res.status(200).json({message: 'o Usuário foi removido com sucesso'})
    }catch(error){
        res.status(500).json({error:error})
    }
})

module.exports = router