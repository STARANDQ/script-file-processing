module.exports = function(req, res) {
    User.findOne({ unique_id: req.session.userId, role: 'supervisor' }, (err, dataR) => {
        if (dataR) {
            let supervisorLogin = dataR.login;
            User.find({role: 'employee', supervisor: supervisorLogin}, (err, data) => {

                return res.render('stats.ejs', {
                    "data": [],
                    "name": dataR.name,
                    "surname": dataR.surname,
                    "idProfile": supervisorLogin
                });
            });
        }else
            return res.render('login.ejs');
    });
};