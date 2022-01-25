module.exports = function(profileID, req, dataProfiles, dataScript, res) {
    profileID = (req._parsedUrl.pathname).replace("/profile/", "");
    User.find({}, (err, data) => {
        dataProfiles = data;
        Script.find({}, (err, data) => {
            dataScript = data;
            User.findOne({ login: profileID }, (err, data) => {
                if (!data) {
                    res.redirect('/profile');
                } else {
                    return res.render('editProfile.ejs', {
                        "id": data.unique_id,
                        "name": data.name,
                        "surname": data.surname,
                        "patronymic": data.patronymic,
                        "role": data.role,
                        "login": data.login,
                        "password": data.password,
                        "fileIdentification": data.fileIdentification,
                        "email": data.email,
                        "data": {
                            "users": dataProfiles,
                            "scripts": dataScript
                        },
                        "scripts": JSON.stringify(data.script),
                    });
                }
            });
        });
    });


};