class AppService {
    constructor(Model) {
        this.Model = Model
    }

    findOne(query = {}, fields) {
        return this.Model.findOne(query, fields);
    }
}

module.exports = AppService;