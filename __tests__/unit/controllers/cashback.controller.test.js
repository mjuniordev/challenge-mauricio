const CashbackMock = require('../../__mocks__/cashback.mock');
// const ModelMock = require('../../__mocks__/model.mock')

describe('cashback.controller', () => {
    const CashbackController = require('../../../app/controllers/cashback.controller');
    const BoticarioService = require('../../../app/services/boticario.service');

    afterEach(() => {
        jest.restoreAllMocks()
    });

    test('Should be defined', () => {
        const cashbackController = new CashbackController();
        const boticarioService = new BoticarioService()
    });

    describe('getCashback', () => {
        test('Must return success when fetching data from external API', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock');
            const get = jest.spyOn(BoticarioService.prototype, 'getCashback').mockResolvedValue(CashbackMock);
            const cashbackController = new CashbackController();
            let response;

            await cashbackController.getCashback(req, res, next)
                response = res.json.mock.calls[0][0]

                expect(get).toBeCalled()
                expect(response.data.statusCode).toEqual(200);
                expect(response.data.body.credit).toEqual(1453);
                done()
        });

        test('Should fall for catch when trying to fetch data from external API', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock');
            errorMock = { message: 'Catch error' }
            const get = jest.spyOn(BoticarioService.prototype, 'getCashback').mockRejectedValue(errorMock);
            const cashbackController = new CashbackController();
            let response;

            await cashbackController.getCashback(req, res, next)
                response = next.mock.calls[0][0]

                expect(get).toBeCalled()
                expect(response.message).toEqual('Catch error');
                done()
        });
    });
});