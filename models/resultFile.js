const mongoose = require('mongoose');
const Schema = mongoose.Schema;

fileResultDataSchema = new Schema( {
	fileName: String,
	fileNameUploads: String,
	fileStatus: {
		type: String,
		default: ""
	},
	userName: String,
	counter: Number,
	createdAt: {
		type: Date,
		default: Date.now
	}
});
FileDataResult = mongoose.model('FileDataResult', fileResultDataSchema);

module.exports = FileDataResult;