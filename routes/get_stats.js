module.exports = function(req, res) {
    User.findOne({ unique_id: req.session.userId, role: 'supervisor' }, (err, dataR) => {
        if (dataR) {
            let supervisorLogin = dataR.login;
            User.find({role: 'employee', supervisor: supervisorLogin}, (err, data) => {
                let resultArr = [];
                let colorsArr = ["red", "blue", "green", "black", "yellow", "pink"];

                let tempData = [];
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < Math.floor(Math.random() * 100); j++) {
                        if(Math.floor(Math.random() * 100) < 10){
                            tempData.push(null);
                        }else{
                            tempData.push(Math.floor(Math.random() * 100));
                        }
                    }
                    resultArr.push({
                        label: (data[i].name + " " + data[i].surname),
                        data: tempData,
                        backgroundColor: colorsArr[i],
                        borderColor: colorsArr[i],
                        borderWidth: 1
                    })
                    tempData = [];
                }
                return res.render('stats.ejs', {
                    "data": resultArr,
                    "name": dataR.name,
                    "surname": dataR.surname
                });
            });
        }else
            return res.render('login.ejs');
    });
};