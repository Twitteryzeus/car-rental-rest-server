const express = require('express');
const router = express.Router();
const userServices = require('../service');

router.post('/login', userServices.loginOTP);

module.exports = router;