//Перехватчик для получения токена и имени пользователя из запроса

const jwt = require('jsonwebtoken')
const config = require('config')        // https://www.npmjs.com/package/config

module.exports = (req, res, next) => {

    //В случае проверки работоспособности сервера - ничего не делаем
    if (req.method === 'OPTIONS'){
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] //"Bearer TOKEN"

        if(!token){
            return res.status(401).json({ message: 'Нет авторизации' })
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded

        next()

    } catch (e){
        res.status(401).json({ message: 'Нет авторизации' })
    }
}
