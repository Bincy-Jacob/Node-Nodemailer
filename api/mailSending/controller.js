const { sendMail } = require('../../modules/mailer');

exports.sendEmail = async (req, res, next) => {
  sendMail(req.body, res);
};
