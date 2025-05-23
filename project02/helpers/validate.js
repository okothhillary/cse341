const Validator = require("validatorjs");
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  if (validation.fails()) {
    return callback(validation.errors.all(), false);
  }
  return callback(null, true);
}

module.exports =  validator