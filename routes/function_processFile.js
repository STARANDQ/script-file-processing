module.exports = function(fileID) {
    Logger.Warn(Logger.Mode.SERVER, "Process File id: " + fileID);
    let fileDataDB;
    let usersDB;

    let fileScript = [];
    let filesArr = [];

    let _nameScript = "";
    let _idScript = "";
    let _nameChapter = "";
    let _arrBlocks = [];
    let _arrChapter = [];
    let _nameBlock = "";
    let _generalWeight = 0;
    let _coefficientScript = 0;
    let WeightScript = 0;
    let _keywordsBlockScript = "";
    let WeightChapter = 0;
    let result = 0;

    let maxWeightBlock = 0;
    let maxWeightChapter = 0;
    let maxWeightScript = 0;

    let id = 0;

    async function PromiseUsers(){
        return User.find({ fileIdentification: {$ne: ''} }, (err, data) => {data});
    }

    async function PromiseFileData(){
        return ResultFile.find({ _id:fileID }, (err, data) => { data });
    }

    fileDataDB = PromiseFileData();
    usersDB = PromiseUsers();
    usersDB.then(users => {
        filesArr = [];
        fileDataDB.then(file => {
            users.forEach(user => {
                if(checkFileName(user.fileIdentification, file[0].userName)){
                    filesArr = {
                        "id":file[0]._id,
                        "text": fs.readFileSync(__dirname.replace("/routes", "") +
                            "/ResultFile/" + file[0].fileNameUploads, "utf8"),
                        "counter": file[0].counter
                    };


                    Script.findOne({ unique_id:user.script }, (err, data) => {
                        if(!data) return;
                        _nameScript = data.name;
                        _idScript = data._id;
                        _coefficientScript = data.coefficient;
                        _keywordsBlockScript = data.keywordsBlock;



                        maxWeightScript = 0;
                        _arrChapter = [];
                        JSON.parse(data.script).forEach(chapter => {
                            maxWeightChapter = 0;
                            _nameChapter = chapter.name;
                            _arrBlocks = [];
                            WeightChapter = 0;

                            chapter.blockArr.forEach(block => {
                                _nameBlock = block.blockName;
                                maxWeightBlock = 0;

                                maxWeightBlock += +block.blockWeight;
                                result = checkBlockData({
                                    conditionalBlock: block.conditionalWords,
                                    words: block.keyWords.split("\n"),
                                    blockType:block.blockMode,
                                    text:filesArr.text,
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

                        });

                        fileScript = {
                            "nameScript": _nameScript,
                            "valueScript": +WeightScript,
                            "valueMaxScript": +maxWeightScript,
                            "Chapters": _arrChapter,
                            "ratioScript":proportion(+maxWeightScript, +WeightScript)
                        };

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
                                date: Date.now()
                            })
                            _generalWeight = 0;
                            newHistory.save((err, History) => {
                                if (err) Logger.Error(Logger.Mode.HISTORY, err);
                                else{
                                    Logger.Message(Logger.Mode.HISTORY, "Add History for file " + History.fileName);
                                    id++;
                                    User.findOne({unique_id: user.unique_id}, (err, dataUser) => {
                                        User.findOne({login: dataUser.supervisor}, (err, dataSupervisor) => {
                                            sendMessage(dataSupervisor.email, "Script", "Check your profile", "Check your profile").then(() => {
                                                Logger.Message(Logger.Mode.EMAIL, "Send message. Email: " + dataSupervisor.email);
                                            });
                                        });
                                    });
                                }
                            });

                        });
                    });
                }
            })
        })
    });
};