module.exports = function(fileIdentification, fileName) {
    if(fileIdentification)
        return ((fileName.split(fileIdentification.toString()).length - 1) > 0);
    else
        return false;
};