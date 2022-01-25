module.exports = async function(path, res) {
    const arrayFiles = await getFiles(path.dirname(require.main.filename)+'/files').then(async arrayFiles => {
        console.log(("[ - - - - - - ] " + "[ post_scriptStarus ] getFiles").red);
        await getSearchFile(arrayFiles.length - 1, arrayFiles).then(r  => {
            console.log(("[ - - - - - - ] " + "[ post_scriptStarus ] getSearchFile").red);
            res.send({
                "Success": "reload",
            });
        })
    });
};