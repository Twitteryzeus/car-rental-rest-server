const express = require('express');
const router = express.Router();
const userServices = require('../service');

router.post('/login', userServices.loginOTP);
router.post('/verify-otp', userServices.verifyOTP);

module.exports = router;