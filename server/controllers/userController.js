const ApiError = require('../error/ApiError');
const { User, Basket } = require('../models/models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role, name } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, name ,password: hashPassword });
        const basket = await Basket.create({ userId: user.id });
        const token = generateJwt(user.id, user.email, user.name, role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('Incorrected email or password'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Incorrected email or password'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }

    async getUser(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const { id } = jwt.decode(token, process.env.SECRET_KEY)
            const user = await User.findOne({ where: { id: id } });
            console.log(user);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController()