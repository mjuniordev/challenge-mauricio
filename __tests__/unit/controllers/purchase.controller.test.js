const mongoose = require('mongoose')

const ModelMock = require('../../__mocks__/model.mock')
const PurchaseMock = require('../../__mocks__/purchase.mock')
const PurchaseArrayMock = require('../../__mocks__/purchaseArray.mock')
const UpdateStatusMock = require('../../__mocks__/updatestatus.mock')
const UpdateStatusNokMock = require('../../__mocks__/updateStatusNok.mock')
const RemoveStatusMock = require('../../__mocks__/removestatus.mock')
const RemoveStatusNokMock = require('../../__mocks__/removeStatusNok.mock')
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
        test('Must return Success when registering a new purchase with validation cpf', async done => {
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

        test('Must return Success when registering a new purchase with approved cpf', async done => {
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

        test('Must return Success when registering a new purchase with value up to 1000', async done => {
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

        test('Must return Success when registering a new purchase with a value between 1000 and 1500', async done => {
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

        test('Must return Success when registering a new purchase with value from 2000', async done => {
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

        test('Should fall into catch when trying to register a new purchase', async done => {
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
        test('Must update purchase successfully', async done => {
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

        test('Must return error when trying to update purchase', async done => {
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
        
        test('Should return an error when trying to validate whether the updated purchase belongs to the logged in user', async done => {
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

        test('Must return error when trying to update a purchase with Approved status', async done => {
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

        test('Should fall for catch when trying to update a purchase', async done => {
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
        test('Must successfully delete a purchase', async done => {
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

        test('Should get an error when trying to delete a purchase', async done => {
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

        test('Should get an error when trying to delete a purchase with Approved status', async done => {
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

        test('Should get an error when not finding a registered purchase', async done => {
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

        test('Should catch catch when trying to delete a purchase', async done => {
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

    describe('show', () => {
        test('List the registered purchases must be returned successfully', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const find = jest.spyOn(PurchaseService.prototype, 'find').mockResolvedValue([PurchaseArrayMock])
            let purchaseController = new PurchaseController()

            await purchaseController.show(req, res, next)

            expect(find).toBeCalled()
            expect(res.json.mock.calls[0][0][0]).toBe(PurchaseArrayMock)
            done()
        });

        test('Should fall in catch when trying to list the registered purchases', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const errorMock = { message: 'Catch error' }
            const find = jest.spyOn(PurchaseService.prototype, 'find').mockRejectedValue([errorMock])
            let purchaseController = new PurchaseController()

            await purchaseController.show(req, res, next)

            expect(find).toBeCalled()
            expect(next.mock.calls[0][0][0]).toBe(errorMock)
            done()
        });
    })
})