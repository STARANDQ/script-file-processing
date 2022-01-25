module.exports = function(req, res) {
    User.findOne({ unique_id: req.session.userId }, (err, data) => {
        if (!data) {
            res.redirect('/login');
        } else {
            let dataSend = [];
            User.find({}, (err, dataUser) => {
                dataUser.forEach(elem => {
                    if(elem.supervisor === data.login){
                        dataSend.push(elem);
                    }
                });
                History.find({}, (err, dataHistory) => {
                    return res.render('employeeList.ejs', {
                        "data": dataSend,
                        "history": dataHistory
                    });
                })

            });

        }
    });
};