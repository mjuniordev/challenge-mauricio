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

PurchaseSchema.methods.calculateCB = ( price, cb ) => {
    let cashback;

    if (price <= 1000) {
        cashback = 10; 
    } else if (price > 1000 && price <= 1500) {
        cashback = 15;
    } else {
        cashback = 20;
    }
    const total = price * (cashback /100)

    if (cb) {
        return cashback;
    } else {
        return total;
    }
}

PurchaseSchema.pre('save', async function(next) {
    this.cashbackValue = this.calculateCB(this.price)
    this.cashbackPercentage = this.calculateCB(this.price, true);
    next();
});

module.exports = mongoose.model("Purchase", PurchaseSchema);