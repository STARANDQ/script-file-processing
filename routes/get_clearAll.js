module.exports = function(res) {
    FileData.deleteMany({ }, (err, data) => {
        Logger.Warn(Logger.Mode.FILE, "Files clear in database");
    });
    Result.deleteMany({ }, (err, data) => {
        Logger.Warn(Logger.Mode.RESULT, "Result clear in database");
    });
    History.deleteMany({ }, (err, data) => {
        Logger.Warn(Logger.Mode.HISTORY, "History clear in database");
    });
    ResultFile.deleteMany({ }, (err, data) => {
        Logger.Warn(Logger.Mode.RESULT, "ResultFile clear in database");
    });
    return res.redirect('/scriptStatus');
};