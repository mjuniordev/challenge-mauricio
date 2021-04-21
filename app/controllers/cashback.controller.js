const BoticarioService = require('../services/boticario.service');
const boticarioService = new BoticarioService();

class CashbackController {
    constructor() {

    }

    async getCashback(req, res, next) {
        const { cpf } = req.params;

        try {
            const response = await boticarioService.getCashback(cpf);

            return res.json({ response });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CashbackController;