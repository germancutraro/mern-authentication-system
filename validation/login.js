const Validator = require('validator');

const lengthInput = function (inputName, min, max, errorMessage) {
  if (!Validator.isLength(inputName, { min, max }))
   return errorMessage;
}

const loginValidation = data => {

  const { email, password } = data;
  let errors = {};

  // Length input value validation
  errors.email = lengthInput(email, 5, 100, 'The email field must be greater than 5 characters');
  errors.password = lengthInput(password, 5, 1024, 'The password field must be greater than 5 characters');
  // Email validate format
  if (!Validator.isEmail(email)) errors.email = 'Email format is incorrect';
  // Empty validation
  if (Validator.isEmpty(email)) errors.email = 'Email field is required';
  if (Validator.isEmpty(password)) errors.password = 'Password field is required';

  // if each key of errors is undefined, we must empty the objects
  if (!errors.email && !errors.password)
    errors = {};

    return {
     errors,
     isValid: Object.keys(errors).length
   } 

};  

module.exports = loginValidation;