const func = async function(dir, files_) {
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files){
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            await this(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};
module.exports = func;