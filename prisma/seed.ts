import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function createOneCategory(){
    const category = await prisma.category.create({
        data: {
            name: 'Keyboards2',
            src: "asdasdasd"
        }
    })
}

async function createOneProduct(){
    const product = await prisma.product.create({
        data: {
            name: 'Keyboard1',
            src: '',
            price: 5,
            categoryId: 2
        }
    })
}

async function findOneProduct(){
    const product = await prisma.product.findUnique({
        where: {
            id: 1
        }
    })
    const category = await prisma.category.findUnique({
        where: {
            id: product?.categoryId
        },

        include: {
            Products: true
        }
    })
    console.log(category)
}

async function findOneCategory(){
    const category = await prisma.category.findUnique({
        where: {
            id: 1
        },

        include: {
            Products: true
        }
    })
    console.log(category)
}

async function createOneUser(){
    const user = await prisma.user.create({
        data:{
            username: "Sergey",
            email: "sergey1@gmail.com",
            password: "12345",
            role: 'admin'
        }
    })
}


async function createUser() {
    const newUser = await prisma.user.create({
      data: {
        id: 4,
        username: "Maria",
        email: "dragnevamasa95@gmail.com",
        password: "123",
        role: "admin",
      },
    });
    console.log(newUser)
  }

async function seeds() {
    await createOneUser()
    await createUser()
}

seeds().then(() => {
    prisma.$disconnect()
}).catch((err) => {
    console.log(err)
    prisma.$disconnect()
})