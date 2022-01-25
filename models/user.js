const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
	unique_id: Number,
	name: String,
	surname: String,
	patronymic: String,
	role: String,
	password: String,
	login: String,
	supervisor: String,
	email: String,
	script: String,
	fileIdentification: {
		type: String,
		default: ""
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
User = mongoose.model('User', userSchema);

module.exports = User;