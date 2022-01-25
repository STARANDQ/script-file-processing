module.exports = function(req, res) {
    if(req.body.status === "remove") {
        User.deleteMany({_id: req.body.id}, (err, data) => {
            Logger.Message(Logger.Mode.REMOVE, "User login: " + req.body.login);
            res.send({ "Success": "reload" });
        });
    }
};

