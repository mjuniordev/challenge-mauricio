const AppService = require('./app.service');
const model = require('mongoose').model('User');

class UserService extends AppService {
    constructor() {
        super(model)

        this.model = model;
    }
}

module.exports = UserService;