module.exports = function(res, scriptStatus, dataStartScripts) {
    return res.render('scriptStatus.ejs', {
        "status": scriptStatus,
        "dataStartScripts": dataStartScripts
    });
};