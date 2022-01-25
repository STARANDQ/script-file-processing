module.exports = function() {
    let date = new Date();
    return date.toDateString() + " | " + date.toLocaleTimeString();
};