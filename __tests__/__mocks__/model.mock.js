class ModelMock {
	constructor(dto) {
		this.dto = dto
	}

	save() { return jest.fn() }

	static find() {
		const sort = jest.fn();
		const skip = jest.fn();
		const limit = jest.fn();
		const chain = { sort, skip, limit };

		sort.mockImplementation(() => chain);
		skip.mockImplementation(() => chain);
		limit.mockImplementation(() => chain);

		return chain
	}

	static findOne() { return jest.fn() }
	static countDocuments() { return jest.fn() }
	static updateMany() { return jest.fn() }
	static updateOne() { return jest.fn() }
	static deleteMany() { return jest.fn() }
	static deleteOne() { return jest.fn() }

}

module.exports = ModelMock