module.exports = function(req, res) {
    User.findOne({ unique_id: req.session.userId }, (err, data) => {
        if (data) {
            return res.render('testing.ejs');
        }else
            return res.redirect('/profile');
    });
};