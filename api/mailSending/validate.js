const Joi = require('joi');

exports.postValidation = async (req, res, next) => {
  const schema = Joi.object({
    to: Joi.string().email().required(),
    subject: Joi.string(),
    cc: Joi.string().email(),
    bcc: Joi.string().email(),
    content: Joi.string().required(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json(err.message);
  }
};
