const Validator = require("validatorjs");

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    favoriteColor: "required|string",
    birthday: "required|string",
  };

  const validation = new Validator(req.body, validationRule);

  validation.checkAsync(
    () => {
      // Validation passed
      next();
    },
    () => {
      // Validation failed
      return res.status(412).json({
        status: false,
        message: "Validation failed",
        errors: validation.errors.all(),
      });
    }
  );
};

module.exports = {
  saveContact,
};
