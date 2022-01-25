module.exports = function(req, res) {
    let personInfo = req.body;
    let emailUser = "";
    if(personInfo.email){
        emailUser = personInfo.email;
    }
    if (!personInfo.name || !personInfo.surname || !personInfo.patronymic || !personInfo.role || !personInfo.password) {
        res.send();
    } else {
        User.findOne({ }, (err, data) => {
            let c;
            User.findOne({}, (err, data) => {
                c = getId(data);
                let newPerson = null;
                if(personInfo.role === "employee") {
                    newPerson = new User({
                        unique_id: c,
                        name: personInfo.name,
                        surname: personInfo.surname,
                        patronymic: personInfo.patronymic,
                        role: personInfo.role,
                        password: personInfo.password,
                        login: personInfo.login,
                        supervisor: personInfo.supervisor,
                        script: personInfo.script,
                        email: emailUser,
                        fileIdentification: personInfo.fileIdentification
                    });
                }else{
                    newPerson = new User({
                        unique_id: c,
                        name: personInfo.name,
                        surname: personInfo.surname,
                        patronymic: personInfo.patronymic,
                        role: personInfo.role,
                        password: personInfo.password,
                        login: personInfo.login,
                        email: emailUser
                    });
                }
                newPerson.save((err, Person) => {
                    if (err)
                        Logger.Error(Logger.Mode.REGISTER, err);
                    else
                        Logger.Message(Logger.Mode.REGISTER, 'User (' + Person.login + ') ФИО: ' +
                            Person.name + " " + Person.surname + " " + Person.patronymic);
                });

            }).sort({ _id: -1 }).limit(1);
            res.send({ "Success": "You are regestered,You can login now." });
        });
    }
};