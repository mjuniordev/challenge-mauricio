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

PurchaseSchema.pre('save', async function(next) {
    next();
});

module.exports = mongoose.model("Purchase", PurchaseSchema);