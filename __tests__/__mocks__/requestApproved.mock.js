module.exports = {
    req: {
        params: {},
        query: {},
        body: {
            price: '1000'
        },
		userCpf: '15350946056'
    },
    res: {
        send: jest.fn(),
        json: jest.fn()
    },
    next: jest.fn()
}