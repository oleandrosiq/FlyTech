import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
    return res.render('../public/views/home.html')
})

export { router }