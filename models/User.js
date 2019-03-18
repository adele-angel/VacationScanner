const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now()
	},
	liked: [
		{
			vacation: {
				type: Schema.Types.ObjectId,
				ref: 'Vacation'
			}
		}
	]
});

module.exports = mongoose.model('User', userSchema);
