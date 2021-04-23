const ModelMock = require('../../__mocks__/model.mock')
const TokenMock = require('../../__mocks__/token.mock')
const UserMock = require('../../__mocks__/user.mock')
const UpdateStatusMock = require('../../__mocks__/updatestatus.mock')
const RemoveStatusMock = require('../../__mocks__/removestatus.mock')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userMock = require('../../__mocks__/user.mock')

jest.spyOn(mongoose, 'model').mockReturnValue(ModelMock)
jest.spyOn(jwt, 'sign').mockReturnValue(TokenMock)

describe('user.controller', () => {
    const UserService = require('../../../app/services/user.service')
    const UserController = require('../../../app/controllers/user.controller')

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('should be defined', () => {
        const userService = new UserService()
        const userController = new UserController()
    })

    describe('create', () => {
        test('Must return success when creating a user', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(UserService.prototype, 'findOne').mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            })
            const insert = jest.spyOn(UserService.prototype, 'insert').mockResolvedValue(UserMock)
            const userController = new UserController()
            let response

            await userController.create(req, res, next)
                response = res.json.mock.calls[0][0]
            
                expect(findOne).toBeCalled()
                expect(insert).toBeCalled()
                expect(response.newUser._id).toBe(userMock._id);
                expect(response.newUser.name).toBe(userMock.name);
                expect(response.newUser.cpf).toBe(userMock.cpf);
                expect(response.newUser.email).toBe(userMock.email);
                expect(response.newUser.password).toBe(undefined);
                done()
        })

        test('Must return error trying to create a user', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(UserService.prototype, 'findOne').mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            })
            const mockError = null
            const insert = jest.spyOn(UserService.prototype, 'insert').mockResolvedValue(mockError)
            const userController = new UserController()
            let response
            
            await userController.create(req, res, next)
                response = next.mock.calls[0][0]
            
                expect(findOne).toBeCalled()
                expect(insert).toBeCalled()
                expect(response.message).toBe('Credentials already exists');
                expect(response.statusCode).toBe(404);
                done()
        })

        test('Should return error when verifying existing user', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(UserService.prototype, 'findOne').mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    ...UserMock,
                    validatePassword: jest.fn().mockResolvedValue(true)
                })
            })
            const userController = new UserController()
            let response
            
            await userController.create(req, res, next)
                response = next.mock.calls[0][0]
            
                expect(findOne).toBeCalled()
                expect(response.message).toBe('Credentials already exists');
                done()
        })

        test('Should fall for catch when trying to create a user', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(UserService.prototype, 'findOne').mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            })
            const mockError = { message: 'Catch Error' }
            const insert = jest.spyOn(UserService.prototype, 'insert').mockRejectedValue(mockError)
            const userController = new UserController()
            let response
            
            await userController.create(req, res, next)
                expect(findOne).toBeCalled()
                expect(insert).toBeCalled()
                expect(next.mock.calls[0][0]).toEqual(mockError);
                done()
        })
    });

    describe('login', () => {
        test('Must return success when logging in', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(UserService.prototype, 'findOne').mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    ...UserMock,
                    validatePassword: jest.fn().mockResolvedValue(true)
                })
            })
            const tokenReturn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
            const jwtSign = jest.spyOn(jwt, 'sign').mockReturnValue(tokenReturn);
            const userController = new UserController();
            let response

            await userController.login(req, res, next)
                response = res.json.mock.calls[0][0]

                expect(findOne).toBeCalled()
                expect(jwtSign).toBeCalled()
                expect(response.token).toBeDefined()
                expect(response.token).toBe(tokenReturn)
                expect(response.user._id).toBe(UserMock._id)
                expect(response.user.cpf).toBe(UserMock.cpf)
                expect(response.user.email).toBe(UserMock.email)
                expect(response.user.name).toBe(UserMock.name)
                expect(response.user.password).toBe(undefined)
                done()
        })

        test('Must return an error when validating the password', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(UserService.prototype, 'findOne').mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    ...UserMock,
                    validatePassword: jest.fn().mockResolvedValue(false)
                })
            })
            const userController = new UserController();
            let response

            await userController.login(req, res, next)
                response = next.mock.calls[0][0]

                expect(findOne).toBeCalled()
                expect(response.message).toBe('Wrong credentials')
                expect(response.statusCode).toBe(401)
                done()
        })

        test('Should return error when validating the user', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const findOne = jest.spyOn(UserService.prototype, 'findOne').mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            })
            const userController = new UserController();
            let response

            await userController.login(req, res, next)
                response = next.mock.calls[0][0]

                expect(findOne).toBeCalled()
                expect(response.message).toBe('Wrong credentials')
                expect(response.statusCode).toBe(401)
                done()
        })

        test('Must return success when logging in', async done => {
            const { req, res, next } = require('../../__mocks__/request.mock')
            const mockError = { message: 'Catch Error' }
            const findOne = jest.spyOn(UserService.prototype, 'findOne').mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    ...UserMock,
                    validatePassword: jest.fn().mockRejectedValue(mockError)
                })
            })
            const userController = new UserController();
            let response

            await userController.login(req, res, next)
                response = next.mock.calls[0][0]

                expect(findOne).toBeCalled()
                expect(next.mock.calls[0][0]).toEqual(mockError);
                done()
        })
    });
});