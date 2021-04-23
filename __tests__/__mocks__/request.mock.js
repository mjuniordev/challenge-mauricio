module.exports = {
    req: {
        params: {},
        query: {},
        body: {}
    },
    res: {
        send: jest.fn(),
        json: jest.fn()
    },
    next: jest.fn()
}