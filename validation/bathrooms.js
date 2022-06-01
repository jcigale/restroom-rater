const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateBathroomInput(data) {
  let errors = {};

  data.location = validText(data.location) ? data.location : '';
  data.title = validText(data.title) ? data.title : '';
  data.rating = validText(data.rating) ? data.rating : '';

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.rating)) {
    errors.rating = 'Rating field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};