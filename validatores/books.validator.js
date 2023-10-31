 import Joi from "joi";

const booksValidator = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().hex().length(24).required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
});

export { booksValidator };
