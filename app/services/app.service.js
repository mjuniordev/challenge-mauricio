class AppService {
    constructor(Model) {
        this.Model = Model
    }

    insert(data) {
        const model = new this.Model(data);

        return model.save();
    }

    findOne(query = {}, fields) {
        return this.Model.findOne(query, fields);
    }
}

module.exports = AppService;