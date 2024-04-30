import { BooksRepository } from '../repositories/books.repository.js'

export class BooksController {
    static instance;
    
    constructor() {
        this.repository = new BooksRepository();
    }

    getAllBooks = async (req, res) =>
    {
        const allBooks = await this.repository.getBooks()
        return res.json(allBooks)
    }

    createBook = async (req, res) =>
    {
        const book = req.body;

        const createdBook = await this.repository.createBook(book)

        return res.json(createdBook)
    }

    updateBook = async (req, res) =>
    {
        const id = Number(req.params.id)
        const book = req.body

        const bookUpdated = await this.repository.updateBook({ id, ...book })

        return res.json(bookUpdated)
    }

    deleteBook = async (req, res) =>
    {
        const id = Number(req.params.id)

        await this.repository.deleteBook(id)

        return res.json({ ok: true })
    }
}