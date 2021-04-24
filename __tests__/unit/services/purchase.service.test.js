const mongoose = require('mongoose')
const ModelMock = require('../../__mocks__/model.mock')
const PurchaseDocument = require('../../__mocks__/purchase.mock')
const UpdateStatusMock = require('../../__mocks__/updatestatus.mock')
const RemoveStatusMock = require('../../__mocks__/removestatus.mock')

describe('insert', () => {
    test('should insert a new document', async done => {
        const save = jest.spyOn(ModelMock.prototype, 'save').mockResolvedValue(PurchaseDocument)
        let PurchaseService
        let purchaseService
        let newDocument

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        newDocument = await purchaseService.insert(PurchaseDocument)

        expect(save).toBeCalled()
        expect(newDocument).toEqual(PurchaseDocument)
        done()
    })

    test('should return error on model.save method', async done => {
        const mockError = { message: 'mockError' }
        let PurchaseService
        let purchaseService

        jest.spyOn(ModelMock.prototype, 'save').mockRejectedValue(mockError)
        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        purchaseService.insert(PurchaseDocument)
            .catch(error => {
                expect(error).toEqual(mockError)
                done()
            })
    })
})

describe('find', () => {
    test('should return all documents', async done => {
        let PurchaseService
        let purchaseService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        data = await purchaseService.find({}, {})
        done()
    })
})

describe('findOne', () => {
    test('should return the document by id', async done => {
        const findOne = jest.spyOn(ModelMock, 'findOne').mockResolvedValue(PurchaseDocument)
        let PurchaseService
        let purchaseService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        data = await purchaseService.findOne({ _id: '111111111111111111111111' })

        expect(findOne).toBeCalled()
        expect(data).toEqual(PurchaseDocument)
        done()
    })

    test('should return error on model.findOne method', async done => {
        const mockError = { message: 'mockError' }
        const findOne = jest.spyOn(ModelMock, 'findOne').mockRejectedValue(mockError)
        let PurchaseService
        let purchaseService

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        await purchaseService.findOne({ _id: '111111111111111111111111' })
            .catch(error => {
                expect(findOne).toBeCalled()
                expect(error).toEqual(mockError)
                done()
            })
    })
})

describe('count', () => {
    test('should return the count of documents', async done => {
        const countDocuments = jest.spyOn(ModelMock, 'countDocuments').mockResolvedValue(2)
        let PurchaseService
        let purchaseService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        data = await purchaseService.count({})

        expect(countDocuments).toBeCalled()
        expect(data).toBe(2)
        done()
    })

    test('should return error on model.count method', async done => {
        const mockError = { message: 'mockError' }
        const countDocuments =  jest.spyOn(ModelMock, 'countDocuments').mockRejectedValue(mockError)
        let PurchaseService
        let purchaseService

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        await purchaseService.count({})
            .catch(error => {
                expect(countDocuments).toBeCalled()
                expect(error).toEqual(mockError)
                done()
            })
    })
})

describe('update', () => {
    test('should update the document', async done => {
        const updateOne = jest.spyOn(ModelMock, 'updateOne').mockResolvedValue(UpdateStatusMock)
        let PurchaseService
        let purchaseService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        data = await purchaseService.update({}, {})

        expect(updateOne).toBeCalled()
        expect(data).toEqual(UpdateStatusMock)
        done()
    })

    test('should return error on model.update method', async done => {
        const mockError = { message: 'mockError' }
        let PurchaseService
        let purchaseService

        jest.spyOn(ModelMock, 'updateOne').mockRejectedValue(mockError)
        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        await purchaseService.findOne({})
            .catch(error => {
                expect(error).toEqual(mockError)
                done()
            })
    })
})

describe('remove', () => {
    test('should remove the document', async done => {
        const deleteOne = jest.spyOn(ModelMock, 'deleteOne').mockResolvedValue(RemoveStatusMock)
        let PurchaseService
        let purchaseService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        data = await purchaseService.remove({})

        expect(deleteOne).toBeCalled()
        expect(data).toEqual(RemoveStatusMock)
        done()
    })

    test('should return error on model.update method', async done => {
        const mockError = { message: 'mockError' }
        let PurchaseService
        let purchaseService
        
        jest.spyOn(ModelMock, 'deleteOne').mockRejectedValue(mockError)
        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        PurchaseService = require('../../../app/services/purchase.service')
        purchaseService = new PurchaseService(ModelMock)

        await purchaseService.findOne({})
            .catch(error => {
                expect(error).toEqual(mockError)
                done()
            })
    })
})