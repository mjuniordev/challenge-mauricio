const AppService = require('./app.service');
const model = require('mongoose').model('Purchase');

class PurchaseService extends AppService {
    constructor() {
        super(model)

        this.model = model;
    }
}

module.exports = PurchaseService;