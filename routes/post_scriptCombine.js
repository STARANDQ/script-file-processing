module.exports = function(dataStartScripts, res) {
    combineFiles().then();
    dataStartScripts = getDateNow();
    Logger.Message(Logger.Mode.SERVER, "Update date in Script Status");
    res.send({
        "Success": "reload",
    });
};