const { body } = require('express-validator');
const requestValidation = require('./request.validation');

module.exports = {
    create: [
        body('code')
            .isString()
            .notEmpty(),

        body('price')
            .isNumeric(),

        body('userCpf')
            .notEmpty()
            .isLength({ min: 11, max: 11 }),

        requestValidation
    ]
}