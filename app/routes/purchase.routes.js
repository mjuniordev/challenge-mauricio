const PurchaseController = require ('../controllers/purchase.controller');
const purchase = new PurchaseController();

const { purchaseValidation } = require('../validation');
const authorization = require('../middlewares/authorization');

module.exports = scope => {
    const { app } = scope
    const basePath = '/purchase'

    app.post(
        `${basePath}/create`,
        authorization,
        purchaseValidation.create,
        purchase.create
    )

    app.put(
        `${basePath}/update/:id`,
        authorization,
        purchaseValidation.update,
        purchase.update
    )
}