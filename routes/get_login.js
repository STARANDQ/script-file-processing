module.exports = function(req, res) {
    User.findOne({ unique_id: req.session.userId }, (err, data) => {
        if (data) {
            return res.redirect('/profile');
        }else
            return res.render('login.ejs');
    });
};