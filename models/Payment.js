// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  address: String,
  publicKey: String,
  privateKey: String,
  amount: Number,
  status: { type: String, default: 'pending' },
  txId: { type: String, default: null },
  callbackUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
