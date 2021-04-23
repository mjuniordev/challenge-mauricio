const ModelMock = require('../../__mocks__/model.mock')
const PurchaseMock = require('../../__mocks__/purchase.mock')
const UpdateStatusMock = require('../../__mocks__/updatestatus.mock')
const RemoveStatusMock = require('../../__mocks__/removestatus.mock')

const mongoose = require('mongoose')
const userMock = require('../../__mocks__/user.mock')
const purchaseMock = require('../../__mocks__/purchase.mock')
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
        





    });




})