const { generateAddress } = require('../services/bitcoinService');
const Payment = require('../models/Payment');
const QRCode = require('qrcode');

const createPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { amount, callbackUrl,label,message } = req.body;
    console.log(amount);
    console.log(callbackUrl);
    const btcInfo = generateAddress();
    // Save the payment info to the database
    const payment = await Payment.create({
      address: btcInfo.address,
      publicKey: btcInfo.publicKey,
      privateKey: btcInfo.privateKey,
      amount,
      callbackUrl,
    });
    const uri = `bitcoin:${btcInfo.address}?amount=${amount}&label=${encodeURIComponent(label)}&message=${encodeURIComponent(message)}`;
    const qrcode = await generateQRCode(uri); 
    res.status(200).json({
      success: true,
      message: 'Address generated and payment created successfully',
      data: {
        address: payment.address,
        paymentId: payment._id,
        qrcode:qrcode
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const paymentStatus = async (req, res) => {
  console.log(req);
  
}
const generateQRCode = (uri) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(uri, function (err, url) {
      if (err) reject(err);
      resolve(url);
    });
  });
};
module.exports = {
  createPayment,paymentStatus
};
