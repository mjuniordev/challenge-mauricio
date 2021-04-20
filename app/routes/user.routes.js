const UserController = require('../controllers/user.controller');
const user = new UserController();

const { userValidation } = require('../validation');

module.exports = scope => {
    const { app } = scope
    const basePath = '/user'

    app.post(
        `${basePath}/create`,
        userValidation.create,
        user.create
    )

    app.post(
        `${basePath}/login`,
        userValidation.login,
        user.login
    )
}