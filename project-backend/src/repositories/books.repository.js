import { PrismaClient } from '@prisma/client'

export class BooksRepository{

    constructor() {
        this.prisma = new PrismaClient()
    }
    
    async createBook({ name, autor, year }) {
        
        const book = await this.prisma.book.create({
        data: {
            name,
            autor,
            year
        }})

        return book
    }

    async getBooks() {
        const books = await this.prisma.book.findMany()
        return books
    }

    async updateBook({ id, name, autor, year }) {
        const book = await this.prisma.book.update({
            where: {
                id
            },
            data: {
                name,
                checked,
                autor,
                year
            }
        })

        return book
    }

    async deleteBook(id) {
        await this.prisma.book.delete({ where: { id } })
    }
}