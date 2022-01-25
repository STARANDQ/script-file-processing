module.exports = function(res, req) {
    User.findOne({ unique_id: req.session.userId }, (err, data) => {
        if (!data) {
            res.redirect('/login');
        } else {
            return res.render('data.ejs', {
                "name": data.name,
                "surname": data.surname,
                "patronymic": data.patronymic,
                "role": data.role,
                "login": data.login,
                "Success": "Success!"
            });
        }
    });
};