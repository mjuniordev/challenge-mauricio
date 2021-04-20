const AppController = require('./app.controller');
const PurchaseService = require('../services/purchase.service');
const purchaseService = new PurchaseService();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

class PurchaseController extends AppController {
    constructor() {
        super(purchaseService)

        this.create = this.create.bind(this);
    }

    async create(req, res, next) {
        try {
            const { code, price, userCpf } = req.body;

            if (userCpf === '15350946056' ) {
                req.body.status = 'Aprovado';
            }

            const newPurchase = await purchaseService.insert(req.body);

            return res.json({ newPurchase });            
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = PurchaseController;