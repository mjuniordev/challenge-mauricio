const { body } = require('express-validator')
const requestValidation = require('./request.validation')

module.exports = {
    create: [
        body('name')
            .isString()
            .notEmpty(),

        body('email')
            .isEmail()
            .notEmpty(),

        body('password')
            .notEmpty()
            .isString()
            .isLength({ min: 3 }),

        body('cpf')
            .notEmpty()
            .isLength({ min: 11, max: 11 }),

        requestValidation
    ]
}