const func = async function(n, dataFile, UserData, FileName, FileNameTemp, counter, fileNames, myId) {
    if(n === -1) {
        console.log(("[ - - - - - - ] " + " [ checkFileInfo ] if(n === -1)").red);
        return;
    } else {
        console.log(("[ - - - - - - ] " + " [ checkFileInfo ] ELSE n === -1").red);

        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }


        await timeout(3000);
        func(n - 1, dataFile, UserData, FileName, FileNameTemp, counter, fileNames, myId);


        /*console.log(UserData.fileIdentification + ' => ' + dataFile[n].fileName);

            if (await checkFileName(UserData.fileIdentification, dataFile[n].fileName)) {
                console.log(("[ - - - - - - ] " + "[ checkFileInfo ] if(checkFileName)").red);
                // counter++;
                // console.log({fileNames:fileNames});


                //ERROR
                await fs.readFile(((path.dirname(require.main.filename) + "/uploads/" + dataFile[n].fileNameUploads)), "utf8",
                    async function (error, data) {
                        console.log(("[ - - - - - - ] " + "[ checkFileInfo ] fs.readFile(((path.dirname(require.main.filename)").red);
                        if (error) Logger.Error(Logger.Mode.FILE, error) // если возникла ошибка
                        //Create File
                        if (FileName !== FileNameTemp) {
                            console.log(("[ - - - - - - ] " + "[ checkFileInfo ] if (FileName !== FileNameTemp) ").red);
                            FileNameTemp = FileName;
                            await fs.open((path.dirname(require.main.filename) + "/ResultFile/" + FileNameTemp), 'a', async function () {
                                console.log(("[ - - - - - - ] " + "[ checkFileInfo ] fs.open((path.dirname(require.main.filename) + \"/ResultFile/\" + FileNameTemp), 'a', async function ()").red);
                                await fs.appendFileSync(((path.dirname(require.main.filename) + "/ResultFile/" + FileNameTemp)), `\n${data}`);
                            });
                        } else {
                            console.log(("[ - - - - - - ] " + "[ checkFileInfo ] ESLE if (FileName !== FileNameTemp) ").red);
                            await fs.appendFileSync(((path.dirname(require.main.filename) + "/ResultFile/" + FileName)), `\n${data}`);
                        }

                        await ResultFile.findOne({
                            fileNameUploads: FileName,
                            userName: UserData.fileIdentification
                        }, async (err, data) => {
                            console.log(("[ - - - - - - ] " + "[ checkFileInfo ] ResultFile.findOne({ ").red);
                            console.log("YES");

                            console.log({
                                data: data,
                                counter: counter,
                                FileName: FileName,
                                fileIdentification: UserData.fileIdentification
                            });

                            if (!data) {
                                console.log("YEEEESSS".america);
                                let newFileData = new ResultFile({
                                    fileName: FileName + ".txt",
                                    fileNameUploads: FileName,
                                    fileStatus: "",
                                    userName: UserData.fileIdentification,
                                    counter: 1
                                });

                                await newFileData.save(async (err, newFileData) => {
                                    console.log("newFileData.save");
                                    if (err)
                                        Logger.Error(Logger.Mode.FILE, err);
                                    else {
                                        Logger.Message(Logger.Mode.FILE, 'Add File ' + newFileData.fileName)
                                    }
                                    console.log("_____".red);
                                    console.log(dataFile);
                                    console.log("_____".red);
                                    console.log("_____".blue);
                                    console.log(dataFile[n]);
                                    console.log("_____".blue);
                                    await FileData.updateMany({_id: dataFile[n]._id},
                                        {$set: {fileStatus: "CHECKED"}}, async function (err, result) {
                                            console.log("[IF] FileData.updateMany({unique_id: dataFile[n].unique_id},");
                                            Logger.Message(Logger.Mode.FILE, "File " + dataFile[n].fileName + " has been checked");
                                            await func(n - 1, dataFile, UserData, FileName, FileNameTemp, counter + 1, fileNames, myId);
                                        });
                                });
                            } else {
                                console.log({counter: data.counter});
                                await ResultFile.updateOne({fileNameUploads: FileName},
                                    {$set: {counter: counter}}, async function (err, result) {
                                        console.log(" await ResultFile.updateMany({fileNameUploads: FileName, },");

                                         await FileData.updateMany({_id: dataFile[n]._id},
                                             {$set: {fileStatus: "CHECKED"}}, async function (err, result) {
                                                 console.log("[ELSE] FileData.updateMany({unique_id: dataFile[n].unique_id},");
                                                 Logger.Message(Logger.Mode.FILE, "File " + dataFile[n].fileName + " has been checked");
                                               await func(n - 1, dataFile, UserData, FileName, FileNameTemp, counter + 1, fileNames, myId);
                                         });
                                         return;
                                    });
                            }
                        });

                    });

                
            }
        else await func(n - 1, dataFile, UserData, FileName, FileNameTemp, counter, fileNames, myId);
        */
    }
};

module.exports = func;