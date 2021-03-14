import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router = Router()

router.get('/', (req: Request, res: Response) => {
    return res.render('../public/views/home.html')
})

router.post('/create', async (req: Request, res: Response) => {    
    const data = await req.body

    if(!data.email || !data.pass || !data.name || !data.number || !data.image || !data.bio || !data.disp || !data.min_p || !data.max_p || !data.type){
        return res.status(400).send({ error: "Usuário inválido!" })
    } else {
        if((await prisma.user.findMany({where:{email: data.email}})).length === 0) {
            await prisma.user.create({
                data: {
                    email: data.email,
                    pass: data.pass,
                    bio: data.bio,
                    name: data.name,
                    disp: data.disp,
                    image: data.image,
                    max_p: data.max_p,
                    min_p: data.min_p,
                    type: data.type,
                    number: data.number
                }
            }).then(() => {
                return res.send({ message: "Usuário cadastrado com sucesso!" })
            })
        } else {
            return res.status(400).send({ error: "Usuário já cadastrado" })
        }
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const data = req.body
    if(!data.email || !data.pass) {
        return res.status(400).send({ error: "Email e/ou senha não informados!" })
    } else {
        if((await prisma.user.findMany({where:{email: data.email}})).length === 0) {
            return res.status(400).send({ error: "Usuário não encontrado!" })
        } else {
            if(await prisma.user.findFirst({ where: { email: data.email, pass: data.pass } })){
                const user = await prisma.user.findFirst({ where: { email: data.email, pass: data.pass } })
                return res.send({ message: "Login feito com sucesso!", user: user })
            } else {
                return res.status(400).send({ error: "Senha incorreta!" })
            }
        }
    }
})

router.post('/update', async (req: Request, res: Response) => {
    const data = req.body
    if(!data.email || !data.pass){
        return res.status(400).send({ error: "Impossível fazer alterações" })
    } else {
        const user = await prisma.user.findFirst({ where: { email: data.email, pass: data.pass } })
        if(user){            
            let newUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                pass: user.pass,
                number: user.number,
                image: user.image,
                bio: user.bio,
                disp: user.disp,
                min_p: user.min_p,
                max_p: user.max_p,
                type: user.type,
                created: user.created
            }

            if(data.number) {
                newUser.number = data.number
            }
            if(data.image) {
                newUser.image = data.image
            }
            if(data.bio) {
                newUser.bio = data.bio
            }
            if(data.disp) {
                newUser.disp = data.disp
            }
            if(data.min_p) {
                newUser.min_p = data.min_p
            }
            if(data.max_p) {
                newUser.max_p = data.max_p
            }
            if(data.type) {
                newUser.type = data.type
            }

            await prisma.user.update({ 
                where: { 
                    email: user.email
                },
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    pass: newUser.pass,
                    number: newUser.number,
                    image: newUser.image,
                    bio: newUser.bio,
                    disp: newUser.disp,
                    min_p: newUser.min_p,
                    max_p: newUser.max_p,
                    type: newUser.type,
                }
            })

            return res.send({ message: "Usuário alterado com sucesso!" })

        } else {
            return res.status(400).send({ error: "Usuário não encontrado!" })
        }
    }
})

router.get('/users', async (req: Request, res: Response) => {
    let users = await prisma.user.findMany()

    for(let user in users) {
        users[user].pass = ""
        users[user].id = 0
        users[user].email = ""
    }
    
    return res.send(users)
})

export { router }