// routes/route.js

const express = require('express');
const loginApi = require('../features/login/loginApi');

const router = express.Router();

router.use('/auth', loginApi); 

module.exports = router;
