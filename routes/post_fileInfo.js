module.exports = function(req, res) {
    FileData.findOne({unique_id: req.body.id}, (err, data) => {
        res.send({
            "Success": "getInfo",
            "Info": data.fileNameUploads
        });
    });
};