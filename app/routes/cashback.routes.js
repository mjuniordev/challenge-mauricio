const CashbackController = require('../controllers/cashback.controller');
const cashback = new CashbackController();

const { cashbackValidation } = require('../validation');
const authorization = require('../middlewares/authorization');

module.exports = scope => {
    const { app } = scope;
    const basePath = '/cashback';

    app.get(
        `${basePath}/:cpf`,
        authorization,
        cashbackValidation.getCashback,
        cashback.getCashback
    )
}