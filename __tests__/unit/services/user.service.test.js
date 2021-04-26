const mongoose = require('mongoose')
const ModelMock = require('../../__mocks__/model.mock')
const UserDocument = require('../../__mocks__/user.mock')
const UpdateStatusMock = require('../../__mocks__/updatestatus.mock')
const RemoveStatusMock = require('../../__mocks__/removestatus.mock')

describe('insert', () => {
    test('should insert a new document', async done => {
        const save = jest.spyOn(ModelMock.prototype, 'save').mockResolvedValue(UserDocument)
        let UserService
        let userService
        let newDocument

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        newDocument = await userService.insert(UserDocument)

        expect(save).toBeCalled()
        expect(newDocument).toEqual(UserDocument)
        done()
    })

    test('should return error on model.save method', async done => {
        const mockError = { message: 'mockError' }
        let UserService
        let userService

        jest.spyOn(ModelMock.prototype, 'save').mockRejectedValue(mockError)
        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        userService.insert(UserDocument)
            .catch(error => {
                expect(error).toEqual(mockError)
                done()
            })
    })
})

describe('find', () => {
    test('should return all documents', async done => {
        let UserService
        let userService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        data = await userService.find({}, {})
        done()
    })  
})

describe('findOne', () => {
    test('should return the document by id', async done => {
        const findOne = jest.spyOn(ModelMock, 'findOne').mockResolvedValue(UserDocument)
        let UserService
        let userService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        data = await userService.findOne({ _id: '111111111111111111111111' })

        expect(findOne).toBeCalled()
        expect(data).toEqual(UserDocument)
        done()
    })

    test('should return error on model.findOne method', async done => {
        const mockError = { message: 'mockError' }
        const findOne = jest.spyOn(ModelMock, 'findOne').mockRejectedValue(mockError)
        let UserService
        let userService

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        await userService.findOne({ _id: '111111111111111111111111' })
            .catch(error => {
                expect(findOne).toBeCalled()
                expect(error).toEqual(mockError)
                done()
            })
    })
})

describe('findById', () => {
    test('should return the document by id', async done => {
        const findOne = jest.spyOn(ModelMock, 'findOne').mockResolvedValue(UserDocument)
        let UserService
        let userService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        data = await userService.findById('111111111111111111111111')

        expect(findOne).toBeCalled()
        expect(data).toEqual(UserDocument)
        done()
    })

    test('should return error on model.findOne method', async done => {
        const mockError = { message: 'mockError' }
        const findOne = jest.spyOn(ModelMock, 'findOne').mockRejectedValue(mockError)
        let UserService
        let userService

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        await userService.findById('111111111111111111111111')
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
        let UserService
        let userService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        data = await userService.count({})

        expect(countDocuments).toBeCalled()
        expect(data).toBe(2)
        done()
    })

    test('should return error on model.count method', async done => {
        const mockError = { message: 'mockError' }
        const countDocuments =  jest.spyOn(ModelMock, 'countDocuments').mockRejectedValue(mockError)
        let UserService
        let userService

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        await userService.count({})
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
        let UserService
        let userService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        data = await userService.update({}, {})

        expect(updateOne).toBeCalled()
        expect(data).toEqual(UpdateStatusMock)
        done()
    })

    test('should return error on model.update method', async done => {
        const mockError = { message: 'mockError' }
        let UserService
        let userService

        jest.spyOn(ModelMock, 'updateOne').mockRejectedValue(mockError)
        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        await userService.findOne({})
            .catch(error => {
                expect(error).toEqual(mockError)
                done()
            })
    })
})

describe('remove', () => {
    test('should remove the document', async done => {
        const deleteOne = jest.spyOn(ModelMock, 'deleteOne').mockResolvedValue(RemoveStatusMock)
        let UserService
        let userService
        let data

        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        data = await userService.remove({})

        expect(deleteOne).toBeCalled()
        expect(data).toEqual(RemoveStatusMock)
        done()
    })

    test('should return error on model.update method', async done => {
        const mockError = { message: 'mockError' }
        let UserService
        let userService
        
        jest.spyOn(ModelMock, 'deleteOne').mockRejectedValue(mockError)
        jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)

        UserService = require('../../../app/services/user.service')
        userService = new UserService(ModelMock)

        await userService.findOne({})
            .catch(error => {
                expect(error).toEqual(mockError)
                done()
            })
    })
})