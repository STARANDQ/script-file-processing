module.exports = function(profileID, dataFiles, req, res) {
    profileID = (req._parsedUrl.pathname).replace("/user/", "");

    User.findOne({ login: profileID }, (err, data) => {
        if (!data) {
            res.redirect('/profile');
        } else{
            Result.find({userID: data.unique_id}, (err, dataHistory) => {
                dataFiles = dataHistory;
                return res.render('userProfile.ejs', {
                    "id": data.unique_id,
                    "name": data.name,
                    "surname": data.surname,
                    "patronymic": data.patronymic,
                    "role": data.role,
                    "login": data.login,
                    "password": data.password,
                    "history": dataHistory.reverse()
                });
            });
        }
    });
};