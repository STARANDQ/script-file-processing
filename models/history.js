const mongoose = require('mongoose');
const Schema = mongoose.Schema;

historySchema = new Schema( {
	unique_id: String,
	userID: String,
	fileID: String,
	fileName: String,
	scriptInfo: Array,
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
History = mongoose.model('History', historySchema);

module.exports = History;