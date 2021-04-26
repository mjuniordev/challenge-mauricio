const { param } = require('express-validator')
const requestValidation = require('./request.validation')

module.exports = {
    getCashback: [
        param('cpf')
            .notEmpty()
            .isLength({ min: 11, max: 11 }),
    
        requestValidation
    ]
}