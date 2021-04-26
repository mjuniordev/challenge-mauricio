const axios = require('axios');

class BoticarioService {
    async getCashback(cpf) {
        if (!cpf) {
            return new Error('cpf, must not be undefined.');
        }

        let response;
        
        try {
            const config = { headers: { "token": process.env.BOTICARIO_TOKEN }}
            const url = `${process.env.BOTICARIO_HOST}/cashback/?cpf=${cpf}`;
            
            response = await axios.get( url, config );
        } catch (error) {
            return error;
        }

        return response.data;
    }
}

module.exports = BoticarioService;