const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        const error = new Error('Without authorization token');
        error.statusCode = 401;
        return next(error);
    }

    const tokenParts = authorization.split(' ');

    if (!tokenParts.length === 2) {
        const error = new Error('Without authorization token');
        error.statusCode = 401;
        return next(error);
    }

    const [ type, token ] = tokenParts;

    if (!/^Bearer$/i.test(type)) {
        const error = new Error('Without authorization token');
        error.statusCode = 401;
        return next(error);
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            const error = new Error('Without authorization token');
            error.statusCode = 401;
            return next(error);
        }

        req.userId = decoded.id;
        return next();
    });
};