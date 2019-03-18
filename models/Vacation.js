const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vacationSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	info: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	from: {
		type: Date,
		required: true
	},
	to: {
		type: Date,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		}
	],
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Vacation', vacationSchema);
