const express = require('express');
const router = express.Router();
const passport = require('passport');

const validateProfileInput = require('../validation/profile'); // Load input validation
const User = require('../models/User'); // Load User model
const Profile = require('../models/Profile'); // Load User model

// GET /profile Get current user profile (private)
router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	const errors = {};

	Profile.findOne({ user: req.user.id })
		.populate('user', ['admin', 'firstname', 'lastname'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// GET /profile/all Get all profiles (public)
router.get('/all', (req, res, next) => {
	const errors = {};

	Profile.find()
		.populate('user', ['admin', 'firstname', 'lastname'])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles';

				res.status(404).json();
			}
			res.json(profiles);
		})
		.catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// GET /profile/handle/:handle Get profile by handle (public)
router.get('/handle/:handle', (req, res, next) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['admin', 'firstname', 'lastname'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// GET /profile/user/:user_id Get profile by id (public)
router.get('/user/:user_id', (req, res, next) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['admin', 'firstname', 'lastname'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// POST /profile Create or edit a user profile (private)
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const profileFields = {};

	profileFields.user = req.user.id;

	if (req.body.handle) profileFields.handle = req.body.handle;

	Profile.findOne({ user: req.user.id }).then(profile => {
		if (profile) {
			Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile =>
				res.json(profile)
			);
		} else {
			Profile.findOne({ handle: profileFields.handle }).then(profile => {
				if (profile) {
					errors.handle = 'That handle already exists';
					res.status(400).json(errors);
				}
				new Profile(profileFields).save().then(profile => res.json(profile));
			});
		}
	});
});

// DELETE /profile Delete user profile (private)
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id }).then(() => {
		User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
	});
});

module.exports = router;
