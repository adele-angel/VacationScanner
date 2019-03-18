const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	handle: {
		type: String,
		required: true,
		max: 40
	},
	date: {
		type: Date,
		default: Date.now()
	},
	vacation: {
		type: Schema.Types.ObjectId,
		ref: 'Vacation'
	}
});

module.exports = mongoose.model('Profile', profileSchema);
