const func = async function(n,arrayFiles) {
    if (n === -1){
        console.log(("[ - - - - - - ] " + "[ function_getSearchFile ] n === -1").red);
        Logger.Message(Logger.Mode.SERVER, "Function getSearchFile was successful completed");
        await combineFiles().then();
        return n;
    }
    else{
        let oldPath = arrayFiles[n];
        let newFileName = generateName();
        let newPath = (arrayFiles[n].toString().replace(arrayFiles[n].toString().replace(path.dirname(require.main.filename)+'/files/', ""), "") + newFileName).replace("/files/", "/uploads/");
        let fileName = (arrayFiles[n].toString().replace(path.dirname(require.main.filename)+'/files/', ""));
        await fs.rename(oldPath, newPath, function (err) {
            console.log(("[ - - - - - - ] " + "[ function_getSearchFile ] fs.rename").red);
            if (err) Logger.Warn(Logger.Mode.FILE, err);
            Logger.Message(Logger.Mode.FILE, "File " + fileName + " renamed");
        });

        let fileID;
        let id = 0;

        let GetInfoFileData = await new Promise(async (resolve, reject) => {
            await FileData.findOne({}, async (err, data) => {
                console.log(("[ - - - - - - ] " + "[ function_getSearchFile ] GetInfoFileData").red);
                await resolve(data);
            })
        });

        await GetInfoFileData.then(async function(GData) {
            console.log(("[ - - - - - - ] " + "[ function_getSearchFile ] GetInfoFileData.then(1)").red);
            return await new Promise(async (resolve, reject) => {
                console.log(("[ - - - - - - ] " + "[ function_getSearchFile ] return Promise").red);
                fileID = getId(GData) + id;
                id++;
                let newFileData = new FileData({
                    unique_id: fileID,
                    fileName: fileName.replace(".txt", ""),
                    fileNameUploads: newFileName,
                    fileStatus: "",
                    userName: getFileUserName(fileName)
                });

                await newFileData.save(async (err, newFileData) => {
                    console.log(("[ - - - - - - ] " + "[ function_getSearchFile ] newFileData.save").red);
                    if (err)
                        Logger.Warn(Logger.Mode.FILE, err);
                    else {
                        Logger.Message(Logger.Mode.FILE, "File " + fileName + " added");

                    }
                    await resolve();
                });
            });
        }).then(async function(result) {
            console.log(("[ - - - - - - ] " + "[ function_getSearchFile ] GetInfoFileData.then(2)").red);
            await func(n - 1,arrayFiles);
        });

    }
};

module.exports = func;