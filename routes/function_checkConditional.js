module.exports = function(script) {
    script.conditionalBlock = script.conditionalBlock.toString().replace("\r\n", "\n");
    let keysArr = script.conditionalBlock.toString().split("\n");
    if (keysArr.length === 0){
        keysArr.push(script.conditionalBlock);
    }
    let keyCount = 0;
    keysArr.forEach(key => {
        if ((script.text.split(key).length - 1) > 0){
            keyCount += script.text.split(key).length - 1;
        }
    })

    let resultNumber = 0;
    let wordsArr = [];

    if(keyCount === 0)
        resultNumber = 0;


    let simpleWordsCount = 0;

    script.words.forEach(word => {
        if ((script.text.split(word).length - 1) > 0)
            wordsArr.push({ word: word, status: true });
        else
            wordsArr.push({ word: word, status: false });
    });

    script.words.forEach(word => {
        if ((script.text.split(word).length - 1) > 0){
            simpleWordsCount += script.text.split(word).length - 1;
        }
    })

    if(script.blockType === "simple"){
        if(simpleWordsCount > keyCount) resultNumber = script.weight;
        else resultNumber = (simpleWordsCount * script.weight / keysArr.length);
    }

    else if(script.blockType === "complex"){
        //{вес блока}*{количество слов в итоговом файле}/({количество слов условного блока}*{количество слов в блоке})
        //return (Math.round( ( script.weight * simpleWordsCount / (keysArr.length * script.words.length))));
        //resolve (Math.round( ( (simpleWordsCount / (keyCount * script.words.length) ) * script.weight) ) )
        let result = (simpleWordsCount / (script.words.length / keyCount) ) * script.weight;
        resultNumber = (result > script.weight) ? script.weight : result;
        //{количество найденных слов внутри итогового файла}/({количество слов для блока}*{количество найденных условных слов внутри итогового файла)). Если число>1 то значение равно весу блока, иначе умножаем на {вес блока}
    }

    else if(script.blockType === "special"){
        //{Вес особого блока} - {Количество найденных слов}*{Вес особого блока}/{количество слов в блоке}
        if(script.weight - simpleWordsCount * script.weight / script.words.length < 0) resultNumber = 0;
        resultNumber = ( script.weight - simpleWordsCount * script.weight / script.words.length );
    }

    return{
        number: resultNumber,
        wordsArr: wordsArr
    };


};