const router = require ('express').Router()
const Author = require('../models/Author')

route.post('/', async(req, res)=>{
    const{name, bio, nationality, birth} = req.body

    if(!name){
        res.status(422).json({error: 'o nome é obrigatório!'})
    }
    if(!bio){
        res.status(422).json({error: 'uma biografia resumida do autor é obrigatória!'})
    }
    if(!nationality){
        res.status(422).json({error: 'a nacionalidade do author é obrigatória'})
    }
    if(!birth){
        res.status(422).json({error: 'a data de nascimento do author é obrigatória'})
    }
    const author = {
        name, 
        bio, 
        nationality, 
        birth,
    }
    try{
        await Author.create(author)
        res.status(201).json({message: ' O autor foi registrado com sucesso!'})
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/', async(req, res)=>{
    try{
        const authors = await Author.find()

        res.status(200).json(authors)
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) =>{
    
    const id = req.params.id
    try{
        const author = await Author.findOne({_id: id})
        if(!author){
            res.status(422).json({ message: 'o autor não foi encontrado '})
            return
        }
        res.status(200).json(author)
    }catch(error){
        res.status(500).json({error: error})
    }
})

//Atualização Parcial - Patch
router.patch('/:id', async(req, res)=> {
    const id = req.params.id

    const{name, bio, nationality, birth} = req.body

    const author = {
        name, 
        bio, 
        nationality, 
        birth,
    }
    try{
        const updatedAuthor = await Author.updateOne({_id:id}, user)

        if(updatedAuthor.matchedCount ===0) {
            res.status(422).json({message: 'O autor não foi encontrado'})
        }

        res.status(200).json(author)
    }catch{
        res.status(500).json({error: error}) 
    }
})

//deletando autores

router.delete('/:id', async (req, res) =>{
    const id = req.params.id

    const author = await Author.findOne({_id:id})

    if(!author){
        res.status(422).json({message: 'o autor não foi encontrado!'})
        return
    }
    try{
        await Author.deleteOne({_id:id})
        res.status(200).json({message: 'o autor foi removido com sucesso'})
    }catch(error){
        res.status(500).json({error:error})
    }
})


module.exports = router