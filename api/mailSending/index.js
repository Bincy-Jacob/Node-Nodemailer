var express = require('express');
var router = express.Router();
const { postValidation } = require('./validate');
const { sendEmail } = require('./controller');

router.route('/').post(postValidation, sendEmail);

module.exports = router;
