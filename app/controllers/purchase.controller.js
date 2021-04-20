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
            if (req.userCpf === '15350946056' ) {
                req.body.status = 'Aprovado';
            }

            req.body.userCpf = req.userCpf;
            const newPurchase = await purchaseService.insert(req.body);

            return res.json({ newPurchase });            
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = PurchaseController;