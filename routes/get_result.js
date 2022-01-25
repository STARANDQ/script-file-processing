module.exports = function(res) {
    let dataFiles;


    async function PromiseFiles(){
        return FileData.find({ }, (err, data) => {data});
    }

    dataFiles = PromiseFiles();

    dataFiles.then(files => {
        History.find({}, (err, history) => {
            return res.render('result.ejs', {
                "data": {
                    "file": files,
                    "history": history
                }
            })
        });
    });
};