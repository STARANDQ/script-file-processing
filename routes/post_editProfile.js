module.exports = function(req, res) {
    let check = true;

    User.find({unique_id: req.body.id}, (err, data) => {
        data.forEach(elem => {
            if(elem.script === req.body.script) check = false;
        });

        if(check){
            FileData.updateMany({userName: ((req.body.name + req.body.surname).toString().toLowerCase())},
                {$set: { fileStatus: "" }}, function (err, result){});
            Logger.Message(Logger.Mode.FILE, "Edit fileStatus in file(s) (userName) " + (req.body.name + req.body.surname).toString().toLowerCase());
        }

    });

    User.updateOne({ unique_id: req.body.id}, {$set: {
            "login": req.body.login,
            "name": req.body.name,
            "surname": req.body.surname,
            "patronymic": req.body.patronymic,
            "role": req.body.role,
            "password": req.body.password,
            "supervisor": req.body.supervisor,
            "script":req.body.script,
            "fileIdentification":req.body.fileIdentification,
            "email":req.body.email,
        }}, function(err, result){
        Logger.Message(Logger.Mode.EDIT, "Update user " + req.body.login);
        res.send({ "Success": "redirect" });
    });
};