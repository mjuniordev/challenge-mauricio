const axios = require('axios');

class BoticarioService {
    async getCashback(cpf) {
        if (!cpf) {
            throw new Error('cpf, must not be undefined.');
        }

        const config = { headers: { "token": process.env.BOTICARIO_TOKEN }}
        const url = `${process.env.BOTICARIO_HOST}/cashback/?cpf=${cpf}`;
        
        const response = await axios.get( url, config );

        return response.data.body;
    }
}

module.exports = BoticarioService;