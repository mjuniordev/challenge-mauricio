const AppController = require('./app.controller');
const PurchaseService = require('../services/purchase.service');
const purchaseService = new PurchaseService();

class PurchaseController extends AppController {
    constructor() {
        super(purchaseService)

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this._filterCashback = this._filterCashback.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req, res, next) {
        const { price } = req.body;

        try {
            if (req.userCpf === '15350946056' ) {
                req.body.status = 'Aprovado';
            }

            const calculate = this._filterCashback(price);
            
            req.body.cashbackValue = calculate.total;
            req.body.cashbackPercentage = calculate.cashback;
            req.body.userCpf = req.userCpf;

            const newPurchase = await purchaseService.insert(req.body);

            return res.json({ newPurchase });            
        } catch (error) {
            return next(error)
        }
    }

    async update(req, res, next) {
        const { body } = req

        try {
            const _id = req.params.id
            const purchase = await purchaseService.findOne({ _id });

            if (purchase.status === 'Aprovado') {
                const error = new Error('No permission to edit this purchase. APPROVED status');
                error.statusCode = 404;
                return next(error);
            }

            if (purchase.userCpf !== req.userCpf) {
                const error = new Error('No permission to edit this purchase');
                error.statusCode = 404;
                return next(error);
            }

            const calculate = this._filterCashback(body.price);

            body.cashbackValue = calculate.total;
            body.cashbackPercentage = calculate.cashback;
            body.updatedAt = new Date();

            const updatePurchase = await purchaseService.update({ _id }, body)

            if (updatePurchase.ok !== 1) {
                const error = new Error('There was an error when trying to update');
                error.statusCode = 404;
                return next(error);
            }

            const updatedPurchase = await purchaseService.findOne({ _id });

            res.json({ updatedPurchase });
        } catch (error) {
            return next(error);
        }
    }

    async delete(req, res, next) {
        const _id = req.params.id;

        try {
            const purchase = await purchaseService.findOne({ _id });

            if (!purchase) {
                const error = new Error('This purchase does not exist');
                error.statusCode = 404;
                return next(error);
            }

            if (purchase.status === 'Aprovado') {
                const error = new Error('No permission to remove this purchase. APPROVED status');
                error.statusCode = 404;
                return next(error);
            }

            const deletePurchase = await purchaseService.remove({ _id });

            if (deletePurchase.ok !== 1) {
                const error = new Error('There was an error when trying to remove');
                error.statusCode = 404;
                return next(error);
            }

            res.send({ message: `Purchased with id ${_id} successfully removed.`, statusCode: 200 });
        } catch (error) {
            return next(error);
        }
    }

    async show(req, res, next) {
        const { params, fields, sort, skip, limit } = req.query;

        try {
            const data = await purchaseService.find(params, fields, sort, Number(skip), Number(limit))
            
            res.json(data);
          } catch (error) {
            next(error)
          }
    }

    _filterCashback(price) {
        let cashback;

        if (price <= 1000) {
            cashback = 10; 
        } else if (price > 1000 && price <= 1500) {
            cashback = 15;
        } else {
            cashback = 20;
        }
        const total = price * (cashback /100)

        return { cashback, total };
    }
}

module.exports = PurchaseController;