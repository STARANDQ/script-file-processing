module.exports = function(res, req) {
    User.find({ }, (err, data) => {
        if (!data) {
            res.redirect('/data');
        } else {
            return res.render('userInfo.ejs', {
                "data": data,
                "userId": req.session.userId
            });
        }
    });
};