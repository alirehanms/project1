const validate = (schema, key) => (req, res, next) => {
  const element = req[key];
  const result = schema.validate(element);
  if (result?.error) {
    res.status(400).send(result.error.message);
  } else {
    next();
  }
};

export  {validate};
