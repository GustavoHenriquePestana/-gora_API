const router = require('express').Router()
const Donors = require('../models/Donors')

router.post('/', async (req, res)=> {
    const{name, email, cell, address, book_name} = req.body
    
    if(!name){
        res.status(422).json({error: ' o nome é obrigatório!'})
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
    if(!book_name){
        res.status(422).json({error:'o nome do livro doado é obrigatório'})
    }
    
    const donor = {
        name,
        email,
        cell,
        address,
        book_name,
    }
    try{
        await Donors.create(donor)
        res.status(201).json({message: 'Doador adicionado com sucesso!'})
    }catch(error){
        res.status(500).json({ error: error})
    }
})

//Resgate de todos os doadores

router.get('/', async(req, res)=>{
    try{
        const donors = await Donors.find()

        res.status(200).json(donors)
    }catch{
        res.status(500).json({error: error})
    }
})

// Resgatar doador por id
router.get('/:id', async (req, res) =>{
    
    const id = req.params.id
    try{
        const donors = await Donors.findOne({_id: id})
        if(!donor){
            res.status(422).json({ message: 'o doador não foi encontrado '})
            return
        }
        res.status(200).json(donors)
    }catch(error){
        res.status(500).json({error: error})
    }
})

//Atualização Parcial de doadores
router.patch('/:id', async(req, res)=> {
    const id = req.params.id

    const{name, email, cell, address, book_name} = req.body

    const donor = {
        name,
        email,
        cell,
        address,
        book_name,
    }
    try{
        const updatedDonors = await Donors.updateOne({_id:id}, donor)

        if(updatedDonors.matchedCount ===0) {
            res.status(422).json({message: 'O usuário não foi encontrado'})
        }

        res.status(200).json(donor)
    }catch{
        res.status(500).json({error: error}) 
    }
})

//Delete - apagar doador

router.delete('/:id', async (req, res) =>{
    const id = req.params.id

    const donor = await Donors.findOne({_id:id})

    if(!donor){
        res.status(422).json({message: 'o usuário não foi encontrado!'})
        return
    }
    try{
        await Donors.deleteOne({_id:id})
        res.status(200).json({message: 'o Usuário foi removido com sucesso'})
    }catch(error){
        res.status(500).json({error:error})
    }
})

module.exports = router