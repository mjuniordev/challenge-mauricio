const mongoose = require('mongoose')

const ModelMock = require('../../__mocks__/model.mock')
const PurchaseMock = require('../../__mocks__/purchase.mock')
const UpdateStatusMock = require('../../__mocks__/updatestatus.mock')
const UpdateStatusNokMock = require('../../__mocks__/updateStatusNok.mock')
const RemoveStatusMock = require('../../__mocks__/removestatus.mock')
const RemoveStatusNokMock = require('../../__mocks__/removeStatusNok.mock')
const userMock = require('../../__mocks__/user.mock')
const purchaseMock = require('../../__mocks__/purchase.mock')
const { find } = require('../../__mocks__/model.mock')

const model = jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

describe('purchase.controller', () => {
    const PurchaseService = require('../../../app/services/purchase.service')
    const PurchaseController = require('../../../app/controllers/purchase.controller')

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('should be defined', () => {
        const purchaseService = new PurchaseService()
        const purchaseController = new PurchaseController()
    })

    describe('create', () => {
        test('Deve retornar Sucesso ao cadastrar uma nova compra com cpf em validação', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const create = jest.spyOn(PurchaseService.prototype, 'insert').mockResolvedValue(PurchaseMock)
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.create(req, res, next)
                response = res.json.mock.calls[0][0];

                expect(create).toBeCalled()
                expect(response.newPurchase).toEqual(PurchaseMock)
                done()
        });

        test('Deve retornar Sucesso ao cadastrar uma nova compra com cpf aprovado', async done => {
            const { req, res, next } = require('../../__mocks__/requestApproved.mock')
            const PurchaseApprovedMock = require('../../__mocks__/purchaseApproved.mock')
            const create = jest.spyOn(PurchaseService.prototype, 'insert').mockResolvedValue(PurchaseApprovedMock)
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.create(req, res, next)
                response = res.json.mock.calls[0][0];

                expect(create).toBeCalled()
                expect(response.newPurchase).toEqual(PurchaseApprovedMock)
                done()
        });

        test('Deve retornar Sucesso ao cadastrar uma nova compra com valor até 1000', async done => {
            const req = { body: { price: "1000" } }
            const { res, next } = require('../../__mocks__/request.mock')
            const create = jest.spyOn(PurchaseService.prototype, 'insert').mockResolvedValue(PurchaseMock)
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.create(req, res, next)
                response = res.json.mock.calls[0][0];

                expect(create).toBeCalled()
                expect(response.newPurchase).toEqual(PurchaseMock)
                done()
        });

        test('Deve retornar Sucesso ao cadastrar uma nova compra com valor entre 1000 e 1500', async done => {
            const req = { body: { price: "1500" } }
            const { res, next } = require('../../__mocks__/request.mock')
            const create = jest.spyOn(PurchaseService.prototype, 'insert').mockResolvedValue(PurchaseMock)
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.create(req, res, next)
                response = res.json.mock.calls[0][0];

                expect(create).toBeCalled()
                expect(response.newPurchase).toEqual(PurchaseMock)
                done()
        });

        test('Deve retornar Sucesso ao cadastrar uma nova compra com valor a partir de 2000', async done => {
            const req = { body: { price: "2000" } }
            const { res, next } = require('../../__mocks__/request.mock')
            const create = jest.spyOn(PurchaseService.prototype, 'insert').mockResolvedValue(PurchaseMock)
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.create(req, res, next)
                response = res.json.mock.calls[0][0];

                expect(create).toBeCalled()
                expect(response.newPurchase).toEqual(PurchaseMock)
                done()
        });

        test('Deve cair no catch ao tentar cadastrar uma nova compra', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const errorMock = { message: 'Catch error' }
            const create = jest.spyOn(PurchaseService.prototype, 'insert').mockRejectedValue(errorMock)
            const purchaseController = new PurchaseController()

            await purchaseController.create(req, res, next)

                expect(create).toBeCalled()
                expect(next.mock.calls[0][0]).toEqual(errorMock)
                done()
        });
    })

    describe('update', () => {
        test('Deve atualizar a compra com sucesso', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const update = jest.spyOn(PurchaseService.prototype, 'update').mockResolvedValue(UpdateStatusMock)
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockResolvedValue(PurchaseMock);
            const purchaseController = new PurchaseController()
            let response

            await purchaseController.update(req, res, next)
                response = res.json.mock.calls[0][0]

                expect(update).toBeCalled()
                expect(findOne).toBeCalled()
                expect(response.updatedPurchase).toEqual(purchaseMock);
                done();
        });

        test('Deve retornar erro ao tentar atualizar a compra', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const update = jest.spyOn(PurchaseService.prototype, 'update').mockResolvedValue(UpdateStatusNokMock)
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockResolvedValue(PurchaseMock);
            const purchaseController = new PurchaseController()
            let response

            await purchaseController.update(req, res, next)
                response = next.mock.calls[0][0]

                expect(update).toBeCalled()
                expect(findOne).toBeCalled()
                expect(response.message).toEqual('There was an error when trying to update');
                expect(response.statusCode).toEqual(404);
                done();
        });
        
        test('Deve retornar erro ao tentar validar se a compra atualizada pertenca ao usuario logado', async done => {
            const req = { userCpf: "22222222222", body: { price: '2000' }, params: { id: '000000001' } }
            const { res, next } = require('../../__mocks__/request.mock')
            
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockResolvedValue(PurchaseMock);
            const purchaseController = new PurchaseController()
            let response

            await purchaseController.update(req, res, next)
                response = next.mock.calls[0][0]

                expect(findOne).toBeCalled()
                expect(response.message).toEqual('No permission to edit this purchase');
                expect(response.statusCode).toEqual(404);
                done();
        });

        test('Deve retornar erro ao tentar atualizar uma compra com status Aprovado', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const mockApproved = { status: 'Aprovado' }
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockResolvedValue(mockApproved);
            const purchaseController = new PurchaseController()
            let response

            await purchaseController.update(req, res, next)
                response = next.mock.calls[0][0]

                expect(findOne).toBeCalled()
                expect(response.message).toEqual('No permission to edit this purchase. APPROVED status');
                expect(response.statusCode).toEqual(404);
                done();
        });

        test('Deve cair no catch ao tentar atualizar uma compra', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const errorMock = { message: 'Catch error' }
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockRejectedValue(errorMock);
            const purchaseController = new PurchaseController()
            let response

            await purchaseController.update(req, res, next)
                response = next.mock.calls[0][0]

                expect(findOne).toBeCalled()
                expect(response.message).toEqual('Catch error');
                done();
        });
    });

    describe('delete', () => {
        test('Deve deletar uma compra com sucesso', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockResolvedValue(PurchaseMock);
            const remove = jest.spyOn(PurchaseService.prototype, 'remove').mockResolvedValue(RemoveStatusMock)
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.delete(req, res, next)
            response = res.send.mock.calls[0][0];

            expect(findOne).toBeCalled()
            expect(remove).toBeCalled()
            expect(response.message).toBe('Purchased with id undefined successfully removed.')
            expect(response.statusCode).toBe(200)
            done()
        });

        test('Deve obter erro ao tentar deletar uma compra', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockResolvedValue(PurchaseMock);
            const remove = jest.spyOn(PurchaseService.prototype, 'remove').mockResolvedValue(RemoveStatusNokMock)
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.delete(req, res, next)
            response = next.mock.calls[0][0];

            expect(findOne).toBeCalled()
            expect(remove).toBeCalled()
            expect(response.message).toBe('There was an error when trying to remove')
            expect(response.statusCode).toBe(404)
            done()
        });

        test('Deve obter erro ao tentar deletar uma compra com status Aprovado', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const mockApproved = { status: 'Aprovado' }
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockResolvedValue(mockApproved);
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.delete(req, res, next)
            response = next.mock.calls[0][0];

            expect(findOne).toBeCalled()
            expect(response.message).toBe('No permission to remove this purchase. APPROVED status')
            expect(response.statusCode).toBe(404)
            done()
        });

        test('Deve obter erro ao não encontrar uma compra cadastrada', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockResolvedValue(null);
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.delete(req, res, next)
            response = next.mock.calls[0][0];

            expect(findOne).toBeCalled()
            expect(response.message).toBe('This purchase does not exist')
            expect(response.statusCode).toBe(404)
            done()
        });

        test('Deve cair no catch ao tentar deletar uma compra', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const errorMock = { message: 'Catch error' }
            const findOne = jest.spyOn(PurchaseService.prototype, 'findOne').mockRejectedValue(errorMock);
            const purchaseController = new PurchaseController()
            let response;

            await purchaseController.delete(req, res, next)
            response = next.mock.calls[0][0];

            expect(findOne).toBeCalled()
            expect(response.message).toBe('Catch error')
            done()
        });
    })
})