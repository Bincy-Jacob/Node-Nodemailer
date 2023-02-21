const nodemailer = require('nodemailer');
const emailExistence = require('email-existence');
const path = require('path');
const ejs = require('ejs');

exports.sendMail = async (filter, res) => {
  const { to, content, subject, cc, bcc } = filter;

  await emailExistence.check(to, async (error, response) => {
    if (response) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.SERVICE,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
          },
        });

        const Filepath = path.join(__dirname, '../views/emailTemplate.ejs');
        ejs.renderFile(Filepath, { to }, async (err, data) => {
          await transporter.sendMail({
            from: process.env.EMAIL,
            to: to,
            cc: cc,
            bcc: bcc,
            subject: subject,
            text: content,
            html: data,
          });
        });
        res.json({
          status: true,
          msg: 'Email sended sucessfully',
        });
      } catch (error) {
        res.json({
          status: false,
          msg: error.message,
        });
      }
    } else
      res.json({
        status: false,
        msg: 'Email doesnot exist',
      });
  });
};
