import Joi from "joi";
const IdValidator = Joi.object({
  id: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("please enter correct id"),
});

export { IdValidator };
