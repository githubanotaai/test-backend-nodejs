const Validate = require("express-validation");

module.exports = (err, req, res, next) => {
  // specific for validation errors

  if (err instanceof Validate.ValidationError)
    return res.status(err.status).json(err);

  // other type of errors, it *might* also be a Runtime Error
  return res.status(500).send(err.stack);
};
