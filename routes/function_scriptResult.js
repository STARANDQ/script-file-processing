module.exports = function() {
    let resultSort = new Promise((resolve, reject) => {
        let usersArr = [];
        let resultArr = [];

        let TempDate;

        let userID;
        let totalInfo = 0;
        let scriptName;

        let arrChapters = [];

        let GTotalInfo = 0;
        let GUserID;
        let GScriptName;
        let GArrChapters = [];

        let arrID = [];

        let TempArr = [];
        let amountTotalInfo = 0;

        let check = false;


        History.find({}, (err, dataHistory) => {
            dataHistory.forEach(elem => {
                arrChapters = [];
                TempDate = new Date(elem.date).toISOString();
                if(getDateWithoutTime(TempDate) ===
                    getDateWithoutTime(new Date().toISOString())){

                    userID = elem.userID;
                    totalInfo += +elem.totalInfo;

                    elem.scriptInfo.forEach(scripts => {
                        amountTotalInfo++;
                        scriptName = scripts.nameScript;
                        arrChapters.push(scripts.arrayChapter);
                    });

                    usersArr.push({
                        "userID": userID,
                        "totalInfo": proportion(100*amountTotalInfo, totalInfo),
                        "scriptName": scriptName,
                        "arrChapters": arrChapters,
                        "amountTotalInfo": amountTotalInfo
                    });

                }

            })

            for (let i = 0; i < usersArr.length; i++) {
                if(arrID.indexOf(usersArr[i].userID) === -1){
                    arrID.push(usersArr[i].userID);
                    resultArr.push(usersArr[i]);
                }else {
                    for (let j = 0; j < resultArr.length; j++) {
                        if(resultArr[j].userID === usersArr[i].userID){
                            resultArr[j].totalInfo = usersArr[i].totalInfo;
                            TempArr = resultArr[j].arrChapters;
                            resultArr[j].arrChapters = TempArr.concat(usersArr[i].arrChapters);
                        }
                    }
                }
            }

            resolve(resultArr);
        });

    });

    resultSort.then((resultArr) => {

        let id = 0;

        resultArr.forEach(elem => {
            Result.findOne({}, (err, data) => {
                let newResult = new Result({
                    unique_id: getId(data) + id,
                    userID: elem.userID,
                    scriptName: elem.scriptName,
                    totalInfo: proportion(100 * elem.amountTotalInfo, elem.totalInfo),
                    arrChapters: elem.arrChapters,
                    date: Date.now()
                });
                newResult.save((err, Result) => {
                    if (err) Logger.Error(Logger.Mode.RESULT, err);
                    else{
                        Logger.Message(Logger.Mode.RESULT, "Add Sort for script " + Result.scriptName);
                        id++;
                    }
                });
            }).sort({ _id: -1 }).limit(1);
        })

        let arrSender = [];
        let arrUser = [];
        let TempArr = [];

        let arrID = [];
        let EmailSend = "";

        User.find({}, (err, data) => {
            resultArr.forEach(users => {
                for (let i = 0; i < data.length; i++) {
                    if(data[i].unique_id === users.userID){
                        arrUser.push({
                            "info": [{
                                "script": users,
                                "user": data[i]
                            }],
                            "supervisor": data[i].supervisor
                        });
                    }
                }
            });

            for (let i = 0; i < arrUser.length; i++) {
                if(arrID.indexOf(arrUser[i].supervisor) === -1){
                    arrID.push(arrUser[i].supervisor);
                    arrSender.push(arrUser[i]);
                }else {
                    for (let j = 0; j < arrSender.length; j++) {
                        if(arrSender[j].supervisor === arrUser[i].supervisor){
                            TempArr = arrSender[j].info;
                            arrSender[j].info = TempArr.concat(arrUser[i].info);
                        }
                    }
                }
            }

            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < arrSender.length; j++) {
                    if(data[i].login === arrSender[j].supervisor){
                        EmailSend = "Дата " + getDateWithoutTime(new Date().toISOString()) + "\n\n";
                        arrSender[j].info.forEach(person => {
                            EmailSend += "[ Сотрудник ] " + person.user.name + " " + person.user.surname + "\n\n";
                            EmailSend += "Скрипт '" + person.script.scriptName + "' -> ";
                            EmailSend += proportion(100 * person.script.amountTotalInfo, person.script.totalInfo) + "%\n";
                            person.script.arrChapters.forEach(chapters => {
                                chapters.forEach(chapter => {
                                    EmailSend += "\n\tРаздел '" + chapter.nameChapter + "'\t -> \t";
                                    EmailSend += proportion(+chapter.generalChapter, +chapter.weightChapter) + "%\n\n";
                                    chapter.arrBlocks.forEach(block => {
                                        EmailSend += "\t\tБлок '" + block.nameBlock + "'\t -> \t";
                                        EmailSend += proportion(+block.generalBlockWeight, +block.weightBlock) + "%\n";
                                    })
                                });
                            })
                            EmailSend += "____ \n\n";
                        })

                        sendMessage(data[i].email, "Result", EmailSend, EmailSend).then(() => {
                            Logger.Message(Logger.Mode.EMAIL, "Send message. Email: " + data[i].email);
                        });
                    }
                }
            }

        });

    });
};