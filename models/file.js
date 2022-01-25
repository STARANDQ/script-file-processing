const mongoose = require('mongoose');
const Schema = mongoose.Schema;

fileDataSchema = new Schema( {
	unique_id: Number,
	fileName: String,
	fileNameUploads: String,
	fileStatus: {
		type: String,
		default: ""
	},
	userName: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});
FileData = mongoose.model('FileData', fileDataSchema);

module.exports = FileData;