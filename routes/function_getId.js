module.exports = function(data) {
    if (data) return data.unique_id + 1;
    else return 1;
};