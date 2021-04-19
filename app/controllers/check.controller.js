const AppController = require('./app.controller');

class CheckController extends AppController {
    // constructor() {
    //     this.healthCheck = this.healthCheck.bind(this)
    // }

    async healthCheck(req, res) {
        res.status(200).send('...Ok!');
    }
}

module.exports = CheckController;