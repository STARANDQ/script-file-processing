module.exports = async function() {
    console.log(("[ - - - - - - ] " + "[ combineFile ] start").red);
    await User.find({ }, (err, UserData) => {
        let StringFiles = "";
        let checkUser = 0;
        let checkUserTemp = -1;
        let FileName = "";
        let FileNameTemp = "";


        const CheckData = new Promise((resolve, reject) => {
            console.log(("[ - - - - - - ] " + "[ combineFile ] CheckData = new Promice").red);
            resolve(getResultFile( UserData.length-1, UserData, checkUser, FileName, FileNameTemp));
        });

        CheckData.then(info => {
            console.log(("[ - - - - - - ] " + "[ combineFile ] END PROMICE").red);
            Logger.Message(Logger.Mode.SERVER, "Function CombineFiles was successful completed");
        });
    });
};