var express = require('express');
var router = express.Router();

const sendRoutes = require('../api/mailSending/index');

router.use('/send-mail', sendRoutes);

module.exports = router;
