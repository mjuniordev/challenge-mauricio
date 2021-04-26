module.exports = {
    req: {
        params: {},
        query: {},
        body: {
            price: '1500'
        },
        userCpf: '11111111111'
    },
    res: {
        send: jest.fn(),
        json: jest.fn()
    },
    next: jest.fn()
}