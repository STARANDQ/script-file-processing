module.exports = async function() {
    await User.find({ }, (err, UserData) => {
        let StringFiles = "";
        let checkUser = 0;
        let checkUserTemp = -1;
        let FileName = "";
        let FileNameTemp = "";


        const CheckData = new Promise((resolve, reject) => {
            resolve(getResultFile( UserData.length-1, UserData, checkUser, FileName, FileNameTemp));
        });

        CheckData.then(info => {
            Logger.Message(Logger.Mode.SERVER, "Function CombineFiles was successful completed");
        });
    });
};