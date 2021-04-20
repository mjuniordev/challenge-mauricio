const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
    code: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    purchaseDate: {
        type: String,
        required: true
    },
    userCpf: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Em validacao'
    },
    cashbackValue: {
        type: Number,
        min: 0,
        default: 0
    },
    cashbackPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model("Purchase", PurchaseSchema);