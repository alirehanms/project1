import Joi from "joi";
const schema = Joi.object().keys({
  fullName: Joi.string().required().messages({
    "any.required": "name is required.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
  role: Joi.string().valid("normal").required().messages({
    "any.required": "User role is required.",
    "any.only": 'User role must be "normal".',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
});
const signinSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
});
export{schema,signinSchema}