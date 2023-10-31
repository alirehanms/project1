import Joi from "joi";
const authorsValidator = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "name is required.",
  }),
});


  
export { authorsValidator };