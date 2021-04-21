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

    update(_id, data) {
        return this.Model.update({ _id }, data)
    }

    remove(_id) {
        return this.Model.deleteOne({ _id })
    }

    find(params = {}, fields = {}, sort, skip, limit) {
        console.log(params)
        return this.Model.find(params, fields)
          .sort(sort)
          .skip(skip)
          .limit(limit)
    }
}

module.exports = AppService;