const router = require('express').Router()
const Books = require('../models/Books')


router.post('/', async (req, res) => {
    const { title, author, category, publication, pages, image } = req.body

    if (!title) {
        res.status(422).json({ error: 'o nome é obrigatório!' })
    }
    if (!author) {
        res.status(422).json({ error: 'o email é obrigatório!' })
    }
    if (!category) {
        res.status(422).json({ error: 'o telefone é obrigatório!' })
    }
    if (!publication) {
        res.status(422).json({ error: 'o endereço é obrigatório!' })
    }
    if (!pages) {
        res.status(422).json({ error: 'o endereço é obrigatório!' })
    }
    if (!image) {
        res.status(422).json({ error: 'o endereço é obrigatório!' })
    }

    const book = {
        title,
        author,
        category,
        publication,
        pages,
        image
    }
    try {
        //criar dados
        await Books.create(book)
        res.status(201).json({ message: 'Livro inserido com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Resgate de todos os livros
router.get('/', async (req, res) => {
    try {
        const book = await Books.find()

        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//resgate parcial dos livros

router.get('/:id', async (req, res) => {

    const id = req.params.id
    try {
        const book = await Books.findOne({ _id: id })
        if (!books) {
            res.status(422).json({ message: 'o livro não foi encontrado ' })
            return
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//atualização parcial dos livros

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { title, author, category, publication, pages } = req.body


    const book = {
        title,
        author,
        category,
        publication,
        pages,
    }
    try {
        const updatedBooks = await Books.updateOne({ _id: id }, book)

        if (updatedBooks.matchedCount === 0) {
            res.status(422).json({ message: 'O livro não foi encontrado' })
        }

        res.status(200).json(books)
    } catch {
        res.status(500).json({ error: error })
    }
})

//delete - apagando livros

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const book = await Books.findOne({ _id: id })

    if (!book) {
        res.status(422).json({ message: 'o Livro não foi encontrado!' })
        return
    }
    try {
        await Books.deleteOne({ _id: id })
        res.status(200).json({ message: 'o Livro foi removido com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


module.exports = router