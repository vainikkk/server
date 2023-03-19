const Joi = require("@hapi/joi");

const registerValidation = (input) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.required(),
  });
  return schema.validate(input);
};

module.exports = {
  registerValidation,
};
