const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
    username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		level: { type: Number, default: 1 },
    lastUpdate: {type: Number, default: Date.now()}
	},
	{ collection: 'userData' }
)

const model = mongoose.model('UserData', User)

module.exports = model
