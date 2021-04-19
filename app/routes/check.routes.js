const CheckController = require('../controllers/check.controller');
const check = new CheckController();

module.exports = scope => {
    const { app } = scope
    const basePath = '/check';

    app.get(
        `${basePath}/hello`,
        check.healthCheck
    )
}