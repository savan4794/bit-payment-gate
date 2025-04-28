const axios = require('axios');

module.exports = async function sendCallback(callbackUrl, data) {
  try {
    const response = await axios.post(callbackUrl, data);
    console.log('Callback sent successfully:', response.data);
  } catch (error) {
    console.error('Failed to send callback:', error.message);
  }
};