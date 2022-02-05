const func = async function(n,arrayFiles) {
    if (n === -1){
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
            if (err) Logger.Warn(Logger.Mode.FILE, err);
            Logger.Message(Logger.Mode.FILE, "File " + fileName + " renamed");
        });

        let fileID;
        let id = 0;

        let GetInfoFileData = new Promise(async (resolve, reject) => {
            FileData.findOne({}, async (err, data) => {
                resolve(data);
            })
        });

        await GetInfoFileData.then(async function(GData) {
            return await new Promise(async (resolve, reject) => {
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
                    if (err)
                        Logger.Warn(Logger.Mode.FILE, err);
                    else {
                        Logger.Message(Logger.Mode.FILE, "File " + fileName + " added");

                    }
                    await resolve();
                });
            });
        }).then(async function(result) {
            await func(n - 1,arrayFiles);
        });

    }
};

module.exports = func;