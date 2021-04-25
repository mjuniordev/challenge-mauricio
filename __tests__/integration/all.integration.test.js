const app = require('../../app/app')
const mongo = require('../../app/db/mongo')
const { color } = require('../../app/constants')

const UserDefault = require('../../app/bootstraps/data/user.json')
const UserMock = require('../__mocks__/user.mock')
const UserCreate = require('../__mocks__/userCreate.mock.json')
const PurchaseCreate = require('../__mocks__/purchaseCreate.mock.json')

const request = require('supertest')
const jwt = require('jsonwebtoken')

let Model, ModelPurchase, idValidation, idApproved;

const init = () => {
    return mongo.connect()
        .then(() => {
            const { express } = app
            const { PORT } = process.env

            app.start()

            Model = require('mongoose').model('User')
            ModelPurchase = require('mongoose').model('Purchase')

            return express.listen(PORT, () => console.log(color.GREEN, `\nAPP RUNNING ON PORT ${PORT}`))
        })
}

const wipe = async () => {
    return await Model.deleteMany({ email: { $ne: UserDefault.email } })
}

const wipeCreate = async () => {
    return await Model.deleteMany({ email: { $ne: UserCreate.email } })
}

describe('All Integrations', () => {
    let Authorization;

    beforeAll(async () => {
        await init()
        // await wipe()
        // wipeCreate()
    })

    afterAll(async () => {
        await wipe()
        // wipeCreate()
        // app.close()
    })

    describe('[POST] /user/create', () => {
        test('should validated', async done => {
            const { body } = await request(app.express)
                .post('/user/create')
                .send({ name: UserCreate.name, cpf: UserCreate.cpf, email: UserCreate.email, password: UserCreate.password })
                .expect(200)

            expect(body.newUser.email).toBe(UserCreate.email)
            done()
        })

        test('should not validated the request', async done => {
            const errorMessage = 'Credentials already exists'
            const { body } = await request(app.express)
                .post('/user/create')
                .send({ name: UserCreate.name, cpf: UserCreate.cpf, email: UserCreate.email, password: UserCreate.password })

            expect(body.message).toBe(errorMessage)
            wipeCreate()
            done()
        })

        test('shold not validate the email', async done => {
            const errorMessage = 'Some fields are incorrectly filled'
            const { body } = await request(app.express)
                .post('/user/create')
                .send({ name: UserCreate.name, cpf: UserCreate.cpf, password: UserCreate.password })

            expect(body.message).toBe(errorMessage)
            done()
        })

        test('shold not validate the password', async done => {
            const errorMessage = 'Some fields are incorrectly filled'
            const { body } = await request(app.express)
                .post('/user/create')
                .send({ name: UserMock.name, cpf: UserMock.cpf, email: UserMock.email })

            expect(body.message).toBe(errorMessage)
            done()
        })

        test('shold not validate the name', async done => {
            const errorMessage = 'Some fields are incorrectly filled'
            const { body } = await request(app.express)
                .post('/user/create')
                .send({ cpf: UserMock.cpf, email: UserMock.email, password: UserMock.password })

            expect(body.message).toBe(errorMessage)
            done()
        })

        test('shold not validate the cpf', async done => {
            const errorMessage = 'Some fields are incorrectly filled'
            const { body } = await request(app.express)
                .post('/user/create')
                .send({ name: UserMock.name, email: UserMock.email, password: UserMock.password })

            expect(body.message).toBe(errorMessage)
            done()
        })
    })

    describe('[POST] /user/login', () => {
        test('should validated', async done => {
            const { body } = await request(app.express)
                .post('/user/login')
                .send({ email: UserDefault.email, password: UserDefault.password })

            Authorization = `Bearer ${body.token}`
            done()
        })

        test('shold not validate the request', async done => {
            const errorMessage = 'Some fields are incorrectly filled'
            const { body } = await request(app.express)
                .post('/user/login')
                .send({ email: UserMock.email })

            const errors = body.message

            expect(errors).toBe(errorMessage)
            done()
        })

        test('shold not validate the email', async done => {
            const errorMessage = 'Wrong credentials'
            const { body } = await request(app.express)
                .post('/user/login')
                .send({ email: UserMock.email, password: UserMock.password })

            expect(body.message).toBe(errorMessage)
            done()
        })

        test('shold not validate the password', async done => {
            const errorMessage = 'Wrong credentials'
            const { body } = await request(app.express)
                .post('/user/login')
                .send({ email: UserDefault.email, password: UserMock.password })

            expect(body.message).toBe(errorMessage)
            done()
        })
    })

    describe('[POST] /purchase/create', () => {
        test('should not validate the Authorization Middleware', async done => {
            const generateToken = undefined;
            Authorization = `Bearer ${generateToken}`;
            const errorToken = 'Without authorization token'

            const { body } = await request(app.express)
                .post('/purchase/create')
                .set('Authorization', Authorization)
                .send({ code: PurchaseCreate.code, price: PurchaseCreate.price, purchaseDate: PurchaseCreate.purchaseDate, password: UserCreate.password })

            expect(body.message).toBe(errorToken);
            done()
        });
        
        test('should validated', async done => {
            const generateToken = jwt.sign({cpf: '11111111113'}, process.env.JWT_SECRET, { expiresIn: 86400 });
            Authorization = `Bearer ${generateToken}`;
            
            const { body } = await request(app.express)
                .post('/purchase/create')
                .set('Authorization', Authorization)
                .send({ code: PurchaseCreate.code, price: PurchaseCreate.price, purchaseDate: PurchaseCreate.purchaseDate, password: UserCreate.password })

            expect(body.newPurchase._id.length).toEqual(24)
            idValidation = body.newPurchase._id;
            done()
        });

        test('should validated with approved cpf', async done => {
            const generateToken = jwt.sign({cpf: '15350946056'}, process.env.JWT_SECRET, { expiresIn: 86400 });
            Authorization = `Bearer ${generateToken}`;
            const statusReturn = 'Aprovado'

            const { body } = await request(app.express)
                .post('/purchase/create')
                .set('Authorization', Authorization)
                .send({ code: PurchaseCreate.code, price: PurchaseCreate.price, purchaseDate: PurchaseCreate.purchaseDate, password: UserCreate.password })

            expect(body.newPurchase.status).toBe(statusReturn)
            idApproved = body.newPurchase._id;
            done()
        });
    })

    describe('[PUT] /purchase/update/:id', () => {
        test('should not validate the Authorization Middleware', async done => {
            const generateToken = undefined;
            Authorization = `Bearer ${generateToken}`;
            const errorToken = 'Without authorization token'

            const { body } = await request(app.express)
                .put(`/purchase/update/${idValidation}`)
                .set('Authorization', Authorization)
                .send({ code: PurchaseCreate.code, price: PurchaseCreate.price, purchaseDate: PurchaseCreate.purchaseDate, password: UserCreate.password })

            expect(body.message).toBe(errorToken);
            done()
        });

        test('should validated', async done => {
            const generateToken = jwt.sign({cpf: '11111111113'}, process.env.JWT_SECRET, { expiresIn: 86400 });
            Authorization = `Bearer ${generateToken}`;
            
            const { body } = await request(app.express)
                .put(`/purchase/update/${idValidation}`)
                .set('Authorization', Authorization)
                .send({ code: PurchaseCreate.code, price: PurchaseCreate.price, purchaseDate: PurchaseCreate.purchaseDate, password: UserCreate.password })

            expect(body.updatedPurchase._id).toEqual(idValidation)
            done()
        });

        test('should not validated on try edit without cpf permission', async done => {
            const generateToken = jwt.sign({cpf: '11111111114'}, process.env.JWT_SECRET, { expiresIn: 86400 });
            Authorization = `Bearer ${generateToken}`;
            const errorMessage = 'No permission to edit this purchase'
            
            const { body } = await request(app.express)
                .put(`/purchase/update/${idValidation}`)
                .set('Authorization', Authorization)
                .send({ code: PurchaseCreate.code, price: PurchaseCreate.price, purchaseDate: PurchaseCreate.purchaseDate, password: UserCreate.password })

            expect(body.message).toBe(errorMessage)
            done()
        });

        test('should not validated on try edit with a approved status', async done => {
            const generateToken = jwt.sign({cpf: '11111111113'}, process.env.JWT_SECRET, { expiresIn: 86400 });
            Authorization = `Bearer ${generateToken}`;
            const errorMessage = 'No permission to edit this purchase. APPROVED status'
            
            const { body } = await request(app.express)
                .put(`/purchase/update/${idApproved}`)
                .set('Authorization', Authorization)
                .send({ code: PurchaseCreate.code, price: PurchaseCreate.price, purchaseDate: PurchaseCreate.purchaseDate, password: UserCreate.password })

            expect(body.message).toBe(errorMessage)
            done()
        });
    })

    describe('[DELETE] /purchase/delete/:id', () => {
        test();
    });
})