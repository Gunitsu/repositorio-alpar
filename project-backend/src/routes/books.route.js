import { Router } from 'express'
import { BooksController } from '../controllers/books.controller.js'

export const booksRouter = Router()
const booksController = new BooksController()

booksRouter.get('/', booksController.getAllBooks)
booksRouter.post('/', booksController.createBook)
booksRouter.patch('/:id', booksController.updateBook)
booksRouter.delete('/:id', booksController.deleteBook)
