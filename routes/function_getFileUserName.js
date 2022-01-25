module.exports = function (name){
    name = name.replace(".txt", "");
    name = name.replace(/[^a-zа-яё]/gi, '').toLowerCase();
    return name;
}