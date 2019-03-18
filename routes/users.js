const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const secretOrKey = require('../config/keys').secretOrKey;
const validateRegisterInput = require('../validation/register'); // Load input validation
const validateLoginInput = require('../validation/login'); // Load input login
const User = require('../models/User'); // Load User model

// POST /user/register Register user
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// POST /user/login Login user | Returning JWT token
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then(user => {
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const payload = { id: user.id, firstname: user.firstname, lastname: user.lastname };

				jwt.sign(payload, secretOrKey, { expiresIn: '72h' }, (err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token
					});
				});
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

// GET /user/current Return current user (private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	res.json({
		id: req.user.id,
		firstname: req.user.firstname,
		lastname: req.user.lastname,
		admin: req.user.admin
	});
});

module.exports = router;
