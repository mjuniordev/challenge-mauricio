class ModelMock {
	constructor(dto) {
		this.dto = dto
	}

	sign() { return jest.fn() }
}

module.exports = ModelMock