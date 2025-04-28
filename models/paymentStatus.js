const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    txid: String,
    vout: String,
    privateKey: String,
    amount: Number,
    status: { type: String, default: 'pending' },
    txId: { type: String, default: null },
    callbackUrl: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PaymentStatus', paymentSchema);