const { generateAddress } = require('../services/bitcoinService');
const Payment = require('../models/Payment');
const QRCode = require('qrcode');

const createPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { amount, callbackUrl } = req.body; // Extract amount and callback URL from request body
    console.log(amount);
    console.log(callbackUrl);
    const btcInfo = generateAddress();
    const label ="INV-0001";
    const message = "payment for INV-0001";
    // Save the payment info to the database
    const payment = await Payment.create({
      address: btcInfo.address,
      publicKey: btcInfo.publicKey,
      privateKey: btcInfo.privateKey,
      amount,
      callbackUrl,
    });
    const uri = `bitcoin:${btcInfo.address}?amount=${amount}&label=${encodeURIComponent(label)}&message=${encodeURIComponent(message)}`;
    QRCode.toDataURL(uri, function (err, url) {
      if (err) throw err;
      console.log(url); // this is a base64 image URL
    });
    // Return the response with payment details
    res.status(200).json({
      success: true,
      message: 'Address generated and payment created successfully',
      data: {
        address: payment.address,
        paymentId: payment._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const paymentStatus = async (req, res) => {
  console.log(req);
  
}

module.exports = {
  createPayment,paymentStatus
};
