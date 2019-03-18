const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
	data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
		errors.firstname = 'Firstname must be between 2 and 30 characters';
	}

	if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
		errors.lastname = 'Lastname must be between 2 and 30 characters';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (Validator.isEmpty(data.firstname)) {
		errors.firstname = 'Firstname field is required';
	}

	if (Validator.isEmpty(data.lastname)) {
		errors.lastname = 'Lastname field is required';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
