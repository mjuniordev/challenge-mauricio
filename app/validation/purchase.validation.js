const { body } = require('express-validator');
const requestValidation = require('./request.validation');

module.exports = {
    create: [
        body('code')
            .isString()
            .notEmpty(),

        body('price')
            .isNumeric(),

        body('purchaseDate')
            .isString(),

        requestValidation
    ],

    update: [
        body('code')
            .isString()
            .notEmpty(),

        body('price')
            .isNumeric(),

        body('purchaseDate')
            .isString(),

        requestValidation
    ]
}