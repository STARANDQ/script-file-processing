module.exports = function(date) {
    let result = "";
    for (let i = 0; i < date.length; i++) {
        if(date[i] === "T") break;
        result += date[i];
    }
    return result;
};