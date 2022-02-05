module.exports = function(script) {

    //console.log("_________".red);
    //console.log(script.keywordsBlock);
    // console.log("_________".red);


    //script.keywordsBlock = script.keywordsBlock.toString().replace("\r\n", "\n");
    //console.log(script.keywordsBlock)
    //console.log("____".green);
    let keysArr = script.keywordsBlock.toString().split("\r\n");
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

    let resultWeight = 0;
    let countWord = 0;

    script.words.forEach(word => {
        if ((script.text.split(word).length - 1) > 0)
            wordsArr.push({ word: word, status: true });
        else
            wordsArr.push({ word: word, status: false });
    });

    script.words.forEach(word => {
        if (script.blockType === "simple"){
            if ((script.text.split(word).length - 1) > 0)
                countWord += script.text.split(word).length-1;

            if(countWord > keyCount){
                resultWeight = script.weight;
            }else{
                //( {сумма сумма слов блока в итоговом файле} / {количество слов в ключевом блоке}*коэф)*вес блока
                resultWeight = (countWord / keyCount * script.coefficient) * script.weight;
            }


        }



        if (script.blockType === "complex") {
            if ((script.text.split(word).length - 1) > 0)
                countWord += script.text.split(word).length-1;

            if (countWord !== 0)
                //{сумма сумма слов блока в итоговом файле}/({количество слов в ключевом блоке}*коэф*{количество слов в условном блоке})*вес блока
                resultWeight = countWord / (keysArr.length * script.coefficient * script.words.length) * script.weight
        }       //{количество найденных слов внутри итогового файла}/({количество слов для блока}*{количество ключевых слов скрипта внутри итогового файла}*{коэф}))

        if (script.blockType === "special") {
            if ((script.text.split(word).length - 1) > 0)
                countWord += script.text.split(word).length-1;

            //{Вес особого блока} - {Количество найденных слов}*{Вес особого блока}/{количество слов в блоке}
            resultWeight = ( script.weight - countWord * script.weight / script.words.length)
            if(resultWeight < 0) resultWeight = 0;
        }
    });
    resultNumber = (resultWeight > script.weight) ? script.weight : resultWeight;
    return {
        number: resultNumber,
        wordsArr: wordsArr
    };
}