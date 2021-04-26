const Axios = require('axios');
const BoticarioDocument = require('../../__mocks__/cashback.mock');

describe('getCashback', () => {
    test('Deve buscar os dados da Api externa', async done => {
        const axios = jest.spyOn(Axios, 'get').mockResolvedValue(BoticarioDocument);
        const fakeCpf = '11111111111';
        const BoticarioService = require('../../../app/services/boticario.service');
        const boticarioservice = new BoticarioService();

        newDocument = await boticarioservice.getCashback(fakeCpf)

            expect(axios).toBeCalled()
            expect(newDocument).toEqual(BoticarioDocument.data)
            done()
    });

    test('Deve retornar erro ao validar a falta do CPF', async done => {
        const fakeCpf = null;
        const axios = jest.spyOn(Axios, 'get').mockResolvedValue(fakeCpf);
        const BoticarioService = require('../../../app/services/boticario.service');
        const boticarioservice = new BoticarioService();

        newDocument = await boticarioservice.getCashback(fakeCpf)

            expect(newDocument.message).toEqual('cpf, must not be undefined.')
            done()
    });

    test('Deve cair no catch ao tentar buscar os dados da Api externa', async done => {
        const fakeCpf = '11111111111';
        const mockError = { message: 'Catch error' };
        const axios = jest.spyOn(Axios, 'get').mockRejectedValue(mockError);
        const BoticarioService = require('../../../app/services/boticario.service');
        const boticarioservice = new BoticarioService();

        newDocument = await boticarioservice.getCashback(fakeCpf)

            expect(axios).toBeCalled()
            expect(newDocument.message).toEqual('Catch error')
            done()
    });
});