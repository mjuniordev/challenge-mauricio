const AppController = require('./app.controller');
const UserService = require('../services/user.service');
const userService = new UserService();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

class UserController extends AppController {
    constructor() {
        super(userService)

        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
    }

    async create(req, res, next) {
        try {
            const { name, cpf, email, password } = req.body;

            const user = await userService.findOne({ $or:[{ email }, { cpf }] }).select('+password');
            if (user) {
                const error = new Error('Credentials already exists');
                error.statusCode = 404;
                return next(error);
            }

            const newUser = await userService.insert({ name, cpf, email, password });
            if (!newUser) {
                const error = new Error('Credentials already exists');
                error.statusCode = 404;
                return next(error);
            }
            
            newUser.password = undefined;
            return res.json({ newUser });
        } catch (error) {
            return next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await userService.findOne({ email }).select('+password')

            if (!user) {
                const error = new Error('Wrong credentials')
                error.statusCode = 401
                return next(error)
            }

            const validPassword = await user.validatePassword(password)

            if (!validPassword) {
                const error = new Error('Wrong credentials')
                error.statusCode = 401
                return next(error)
            }

            const token = jwt.sign({ id: user._id, cpf: user.cpf }, JWT_SECRET, { expiresIn: 86400 });
            user.password = undefined;

            return res.json({ user, token })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = UserController;