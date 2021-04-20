const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    let error

    if (!errors.isEmpty()) {
        error = new Error('Some fields are incorrectly filled');
        error.statusCode = 400

        throw error
    }

    next();
}