const func = async function(n,UserData, checkUser, FileName, FileNameTemp) {
    console.log(("[ - - - - - - ] " + "[ getResultFile ] START FUNCTION").red);
    if (n === -1){
        console.log(("[ - - - - - - ] " + " [ getResultFile ] if(n === -1)").red);
        Logger.Message(Logger.Mode.SERVER, "Function getResultFile was successful completed");
            await ResultFile.find({fileStatus: "" }, async (err, data) => {
                await data.forEach(async file => {
                    await processFile(file._id);
                })
            });
        return n;
    }
    else{
        console.log(("[ - - - - - - ] " + "[ getResultFile ] ELSE { if(n === -1) }").red);
        if(UserData[n].fileIdentification){
            console.log(("[ - - - - - - ] " + "[ getResultFile ] if(UserData[n].fileIdentification)").red);
            checkUser++;
            FileName = generateName();

            let GetInfoFileData = new Promise(async (resolve, reject) => {
                await FileData.find({fileStatus: "" }, (err, data) => {
                    console.log(("[ - - - - - - ] " + "[ getResultFile ] FileData.find").red);
                    resolve(data);
                })
            });

            await GetInfoFileData.then(async function (dataFileGlobal){
                return new Promise(async (resolve, reject) => {
                    console.log(("[ - - - - - - ] " + "[ getResultFile ] return new Promise.then(1) in GetInfoFileData").red);
                    await checkFileInfo(dataFileGlobal.length - 1, dataFileGlobal, UserData[n], FileName,FileNameTemp, 1, [], "");
                    console.log(("[ - - - - - - ] " + "[ getResultFile ] return new Promise.then(2) in GetInfoFileData").red);
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
            console.log(("[ - - - - - - ] " + "[ getResultFile ] NONE INDETIFICATOR").red);
            await func(n - 1, UserData, checkUser, FileName, FileNameTemp);
        }

    }
};

module.exports = func;