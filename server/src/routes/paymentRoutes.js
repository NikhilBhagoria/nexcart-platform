const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect payment route so only logged-in users can checkout
router.post('/create-checkout-session', authMiddleware, createCheckoutSession);

module.exports = router;
