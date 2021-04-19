const AppController = require('./app.controller');

class UserController extends AppController {
    // constructor() {

    // }

    async create(req, res) {
        const { name, cpf, email, password } = req.body;
        
    }
}

module.exports = UserController;