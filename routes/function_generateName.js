module.exports = function() {
    let name = "";

    let chars = ['q', 'w', 'e', 'r', 't',
        'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g',
        'h', 'j', 'k', 'l', 'z',
        'x', 'c', 'v', 'b', 'n',
        'm', '1', '2', '3', '4',
        '5', '6', '7', '8', '9',
        '0'];


    for(let i = 0; i < 32; i++){
        name += chars[getRandomInt(0, 32)];
    }

    return name;
};