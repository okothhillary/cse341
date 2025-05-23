const Validator = require("validatorjs");

// Book validation
const validateBook = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    author: "required|string",
    publishedYear: "required|integer|min:0",
    genre: "required|string",
    pages: "required|integer|min:1",
    isbn: "required|integer|min:1",
    language: "required|string"
  };

  const validation = new Validator(req.body, validationRule);

  validation.checkAsync(
    () => next(),
    () => {
      return res.status(412).json({
        status: false,
        message: "Book validation failed",
        errors: validation.errors.all(),
      });
    }
  );
};

// Author validation
const validateAuthor = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    birthYear: "required|integer|min:0",
    nationality: "required|string",
    genre: "required|string",
    notableWorks: "required|array",
    awards: "required|array"
  };

  const validation = new Validator(req.body, validationRule);

  validation.checkAsync(
    () => next(),
    () => {
      return res.status(412).json({
        status: false,
        message: "Author validation failed",
        errors: validation.errors.all(),
      });
    }
  );
};

module.exports = {
  validateBook,
  validateAuthor,
};
