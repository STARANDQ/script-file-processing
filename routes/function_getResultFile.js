const func = async function(n,UserData, checkUser, FileName, FileNameTemp) {
    if (n === -1){
        Logger.Message(Logger.Mode.SERVER, "Function getResultFile was successful completed");
            await ResultFile.find({fileStatus: "" }, async (err, data) => {
                await data.forEach(async file => {
                    await processFile(file._id);
                })
            });
        return n;
    }
    else{
        if(UserData[n].fileIdentification){
            checkUser++;
            FileName = generateName();

            let GetInfoFileData = new Promise(async (resolve, reject) => {
                await FileData.find({fileStatus: "" }, (err, data) => {
                    resolve(data);
                })
            });

            await GetInfoFileData.then(async function (dataFileGlobal){
                return new Promise(async (resolve, reject) => {
                    await checkFileInfo(dataFileGlobal.length - 1, dataFileGlobal, UserData[n], FileName,FileNameTemp, 1, [], "");
                    await func(n - 1, UserData, checkUser, FileName, FileNameTemp);
                });
            });

            /*
            await GetInfoFileData.then(async function (dataFileGlobal){
                return new Promise(async (resolve, reject) => {
                    console.log(("[ - - - - - - ] " + "[ getResultFile ] return new Promise.then(1) in GetInfoFileData").red);
                    await resolve(await checkFileInfo(dataFileGlobal.length - 1, dataFileGlobal, UserData[n], FileName,FileNameTemp, 1, [], ""));
                });
            }).then(async function (dataRes){
                console.log(("[ - - - - - - ] " + "[ getResultFile ] return new Promise.then(2) in GetInfoFileData").red);
                await func(n - 1, UserData, checkUser, FileName, FileNameTemp);
            });

            */
        }else{
            await func(n - 1, UserData, checkUser, FileName, FileNameTemp);
        }

    }
};

module.exports = func;