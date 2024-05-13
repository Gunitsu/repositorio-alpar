import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.upsert({
        where: {
            email: 'gusta@gmail.com'
        },
        create: {
            name: 'Gustavo Pires',
            email: 'gusta@gmail.com',
            password: '123456',
            admin: true,
        },
        update: {}
    })

    await prisma.product.upsert({
        where: { id: 1, },
        update: {},
        create: {
            name: 'Gran Turismo 7',
            description: 'Jogo Gran Turismo 7 PS5.',
            price: 100,
            imageUrl: 'https://img.odcdn.com.br/wp-content/uploads/2020/09/20200910120937.jpg'
        }
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit()
})