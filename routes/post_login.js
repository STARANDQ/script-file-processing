module.exports = function(req, res) {
    User.findOne({ login: req.body.login }, (err, data) => {
        if(!data){
            res.send({ "Success": "User not found" });
        }else
        if (data) {
            if (data.password === req.body.password) {
                req.session.userId = data.unique_id;
                Logger.Message(Logger.Mode.LOGIN, "User " + data.login);
                res.send({ "Success": "Success!" });
            } else {
                res.send({ "Success": "Wrong password!" });
            }
        } else {
            res.send({ "Success": "This Username Is not regestered!" });
        }
    });
};