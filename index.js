// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
cron.schedule('* * * * *', () => {
  console.log('Cron job is running every minute');
});
connectDB();
// Basic Route
app.get('/', (req, res) => {
  res.send('Bitcoin Payment Gateway API is running!');
});

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
