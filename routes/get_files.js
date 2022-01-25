module.exports = function(res, req) {
    FileData.find({ }, (err, data) => {
        if (!data) {
            res.redirect('/data');
        } else {
            return res.render('files.ejs', {
                "data": data,
                "userId": req.session.userId
            });
        }
    });
};