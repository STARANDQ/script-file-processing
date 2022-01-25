module.exports = function(req, res) {
    let fileID;
    let id = 0;
    req.files.forEach(file => {
        FileData.findOne({}, (err, data) => {
            fileID = getId(data) + id;
            id++;
            let newFileData = new FileData({
                unique_id: fileID,
                fileName: (file.originalname).replace(".txt", ""),
                fileNameUploads: file.filename,
                fileStatus: "",
                userName: getFileUserName(file.originalname)
            });

            newFileData.save((err, newFileData) => {
                if (err)
                    Logger.Error(Logger.Mode.FILE, err);
                else {
                    Logger.Message(Logger.Mode.FILE, 'Add File ' + file.originalname);
                }
            });

        }).sort({ _id: -1 }).limit(1);
    });



    return res.redirect('/files');
};