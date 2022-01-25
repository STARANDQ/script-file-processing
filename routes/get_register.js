module.exports = function(res, req, dataProfiles, dataScript) {
    User.find({}, (err, data) => {
        dataProfiles = data;
        Script.find({}, (err, data) => {
            dataScript = data;
            User.findOne({ unique_id: req.session.userId }, (err, data) => {
                if(!data){
                    return res.redirect('/login');
                }
                else if (data.role === "admin") {
                    return res.render('index.ejs', {
                        "data": {
                            "users": dataProfiles,
                            "scripts": dataScript
                        }
                    });
                }else
                    return res.redirect('/login');
            });
        });
    });
};