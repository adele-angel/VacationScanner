const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVacationInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.info = !isEmpty(data.info) ? data.info : "";
  data.image = !isEmpty(data.image) ? data.image : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = "Title must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.info, { min: 2, max: 500 })) {
    errors.info = "Info must be between 2 and 500 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.info)) {
    errors.info = "Info field is required";
  }

  if (Validator.isEmpty(data.image)) {
    errors.info = "Image URL field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  if (Validator.isEmpty(data.to)) {
    errors.to = "To field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
