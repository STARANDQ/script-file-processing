module.exports = function(fileID) {
    console.log(("[ - - - - - - ] " + " [ processFile ] START ").red);
    Logger.Warn(Logger.Mode.SERVER, "Process File id: " + fileID);
    let fileDataDB;
    let usersDB;

    let blockWeight = 0;
    let countWord = 0;
    let fileScript = [];
    let filesArr = [];

    let _nameScript = "";
    let _idScript = "";
    let _arrayChapter = [];
    let _nameChapter = "";

    let _arrBlocks = [];
    let _arrChapter = [];

    let _arrayWords = [];
    let _generalWords = [];
    let _nameBlock = "";
    let _weightBlock = "";
    let _typeBlock = "";
    let _generalBlockWeight = "";
    let _generalWeight = 0;
    let _generalChapter = 0;
    let _weightChapter = 0;
    let _weightScript = 0;
    let _coefficientScript = 0;
    let counterKeysBlock = 0;
    let WeightScript = 0;
    let _keywordsBlockScript = "";
    let WeightChapter = 0;
    let result = 0;

    let maxWeightBlock = 0;
    let maxWeightChapter = 0;
    let maxWeightScript = 0;

    let id = 0;

    async function PromiseUsers(){
        return User.find({ }, (err, data) => {data});
    }

    async function PromiseFileData(){
        return ResultFile.find({ _id:fileID }, (err, data) => { data });
    }

    fileDataDB = PromiseFileData();
    usersDB = PromiseUsers();
    usersDB.then(users => {
        fileDataDB.then(file => {
            users.forEach(user => {
                if(checkFileName(file[0].userName, user.fileIdentification)){
                    file.forEach(file_ => {
                        filesArr.push({
                            "id":file_._id,
                            "text": fs.readFileSync(__dirname.replace("/routes", "") +
                                "/ResultFile/" + file_.fileNameUploads, "utf8"),
                            "counter": file_.counter
                        });
                    });


                    Script.findOne({ unique_id:user.script }, (err, data) => {
                        if(!data) return;
                        filesArr.forEach(fileText => {
                            console.log(data);
                            _nameScript = data.name;
                            _idScript = data._id;
                            console.log("____")
                            _coefficientScript = data.coefficient;
                            _keywordsBlockScript = data.keywordsBlock;

                            console.log({_nameScript});
                            console.log({_idScript});
                            console.log({_coefficientScript});
                            console.log({_keywordsBlockScript});

                            console.log("\n");

                            _arrChapter = [];
                            JSON.parse(data.script).forEach(chapter => {
                                maxWeightScript = 0;
                                console.log(chapter);
                                _nameChapter = chapter.name;
                                _arrBlocks = [];
                                WeightChapter = 0;

                                chapter.blockArr.forEach(block => {
                                    _nameBlock = block.blockName;

                                    maxWeightBlock += +block.blockWeight;

                                    result = checkBlockData({
                                        conditionalBlock: block.conditionalWords,
                                        words: block.keyWords.split("\n"),
                                        blockType:block.blockMode,
                                        text:fileText.text,
                                        weight:block.blockWeight,
                                        keywordsBlock: _keywordsBlockScript,
                                        coefficient: _coefficientScript
                                    });

                                    _arrBlocks.push({
                                        "nameBlock": _nameBlock,
                                        "valueBlock": +result,
                                        "maxValueBlock": +block.blockWeight,
                                        "ratioBlock":proportion(+block.blockWeight, +result)
                                    })
                                    WeightChapter += +result;
                                    console.log(result.toString().america);
                                    maxWeightChapter += +block.blockWeight;


                                });
                                _arrChapter.push({
                                    "nameChapter": _nameChapter,
                                    "valueChapter": +WeightChapter,
                                    "maxValueChapter": +maxWeightChapter,
                                    "Blocks": _arrBlocks,
                                    "ratioChapter":proportion(+maxWeightChapter, +WeightChapter)
                                })
                                WeightScript += +WeightChapter;
                                maxWeightScript += +maxWeightChapter

                            })


                            console.log(JSON.stringify({
                                "nameScript": _nameScript,
                                "valueScript": +WeightScript,
                                "valueMaxScript": +maxWeightScript,
                                "Chapters": _arrChapter,
                                "ratioScript":proportion(+maxWeightScript, +WeightScript)
                            }));

                            //console.log(JSON.parse(data.script)[0].blockArr)
                            /*checkBlockData(JSON.parse(data[0].script)[0], fileText).then(result => {
                                console.log(result);
                            })*/
                        });

                        return;
                        ResultFile.updateOne({ _id: fileID}, {$set: {"fileStatus": "checked"}}, function(err, result){
                            Logger.Message(Logger.Mode.FILE, "Status file (fileID) " + fileID + " set 'checked'");
                        });
                        ResultFile.updateOne({ _id: fileID}, {$set: {"updateDate": Date.now}}, function(err, result){});

                        History.findOne({}, (err, data) => {
                            let newHistory = new History({
                                unique_id: getId(data) + id,
                                userID: user.unique_id,
                                fileID: fileID,
                                fileName: file[0].fileName,
                                scriptInfo: fileScript,
                                totalInfo: _generalWeight,
                                date: Date.now()
                            })
                            _generalWeight = 0;
                            newHistory.save((err, History) => {
                                if (err) Logger.Error(Logger.Mode.HISTORY, err);
                                else{
                                    Logger.Message(Logger.Mode.HISTORY, "Add History for file " + History.fileName);
                                    id++;
                                    /*User.findOne({unique_id: user.unique_id}, (err, dataUser) => {
                                        User.findOne({login: dataUser.supervisor}, (err, dataSupervisor) => {
                                            console.log(dataSupervisor);
                                            sendMessage(dataSupervisor.email, "Script", "Check your profile", "Check your profile").then(() => {
                                                Logger.Message(Logger.Mode.EMAIL, "Send message. Email: " + dataSupervisor.email);
                                            });
                                        });
                                    });*/
                                }
                                scriptResult();
                            });

                        }).sort({ _id: -1 }).limit(1);
                    });
                }
            })
        })
    })
};