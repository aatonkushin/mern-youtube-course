const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')

const router = Router()

//Генерация ссылки
router.post('/generate', auth, async (req, res)=>{
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()

        const existing = await Link.findOne( { from })

        if (existing){
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({ code, to, from, owner: req.user.userId })

        await link.save()

        res.status(201).json({link})
    } catch (e){
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

//Получение всех ссылок
router.get('/', auth, async (req, res)=>{
    try {
        const links = await Link.find({ owner: req.user.userId })  //поиск в БД по коду пользователя
        res.json(links)
    } catch (e){
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

//Получение ссылки по id
router.get('/:id', auth, async (req, res)=>{
    try {
        const links = await Link.findById(req.params.id)    //поиск в БД по коду ссылки
        res.json(links)
    } catch (e){
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
