module.exports = async function(path, res) {
    const arrayFiles = await getFiles(path.dirname(require.main.filename)+'/files').then(async arrayFiles => {
        await getSearchFile(arrayFiles.length - 1, arrayFiles).then(r  => {
            res.send({
                "Success": "reload",
            });
        })
    });
};