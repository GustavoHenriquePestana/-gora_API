const router = require('express').Router()
const Rented = require('../models/Rented')

router.post('/', async (req, res)=> {
    const{user_id, book_id, caught, devolution} = req.body

    if(!user_id){
        res.status(422).json({error: 'o número de identificação do usuário é obrigatório'})
    }
    if(!book_id){
        res.status(422).json({error: 'o número de identificação do livro é obrigatório!'})
    }
    if(!caught){
        res.status(422).json({error: 'a data de retirada do livro é obrigatória!'})
    }
    if(!devolution){
        res.status(422).json({error: 'a data prevista para a devolução do livro é obrigatória!'})
    }

    const rented = {
        user_id,
        book_id,
        caught,
        devolution,
    }
    try{
        await Rented.create(rented)
        res.status(201).json({ message: 'Usuário inserido com sucesso!'})
    }catch(error){
        res.status(500).json({error: error})
    }
})

//Resgatar todos os livros alugados

router.get('/', async(req, res)=>{
    try{
        const renteds = await Rented.find()

        res.status(200).json(renteds)
    }catch(error){
        res.status(500).json({error: error})
    }
})

//Resgatar livro lugado por id
router.get('/:id', async (req, res) =>{
    
    const id = req.params.id
    try{
        const rented = await Rented.findOne({_id: id})
        if(!rented){
            res.status(422).json({ message: 'o aluguel não foi encontrado '})
            return
        }
        res.status(200).json(rented)
    }catch(error){
        res.status(500).json({error: error})
    }
})

//Atualização paricial dos alugueis

router.patch('/:id', async(req, res)=> {
    const id = req.params.id

    const{user_id, book_id, caught, devolution} = req.body

    const rented = {
        user_id,
        book_id,
        caught,
        devolution,
    }
    try{
        const updatedRented = await Rented.updateOne({_id:id}, rented)

        if(updatedRented.matchedCount ===0) {
            res.status(422).json({message: 'O aluguel não foi encontrado'})
        }

        res.status(200).json(Rented)
    }catch{
        res.status(500).json({error: error}) 
    }
})

//Apagando Registro de aluguel

router.delete('/:id', async (req, res) =>{
    const id = req.params.id

    const rented = await Rented.findOne({_id:id})

    if(!rented){
        res.status(422).json({message: 'o usuário não foi encontrado!'})
        return
    }
    try{
        await Rented.deleteOne({_id:id})
        res.status(200).json({message: 'o Usuário foi removido com sucesso'})
    }catch(error){
        res.status(500).json({error:error})
    }
})
module.exports = router