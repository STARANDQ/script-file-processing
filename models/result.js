const mongoose = require('mongoose');
const Schema = mongoose.Schema;

resultSchema = new Schema( {
	unique_id: Number,
	userID: Number,
	scriptName: String,
	arrChapters: Array,
	date: {
		type: Date,
		default: Date.now
	},
	totalInfo: Number,
	createdAt: {
		type: Date,
		default: Date.now
	}
});
Result = mongoose.model('Result', resultSchema);

module.exports = Result;