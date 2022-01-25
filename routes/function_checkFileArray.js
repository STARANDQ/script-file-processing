module.exports = function(fileName, array) {
    if(fileName){
        for (let i = 0; i < array.length; i++)
            if(array.includes(fileName.split(array[i].toString()).length - 1))
                return true;
    }else
        return false;
};