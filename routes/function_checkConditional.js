module.exports = function(script) {
        console.log("__________".red);
        console.log(script);
        console.log("__________".red);
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

        if(keyCount === 0)
            return 0;


        let simpleWordsCount = 0;

        script.words.forEach(word => {
            if ((script.text.split(word).length - 1) > 0){
                simpleWordsCount += script.text.split(word).length - 1;
            }
        })

        if(script.blockType === "simple"){
            if(simpleWordsCount > keyCount) return script.weight;
            else return (simpleWordsCount * script.weight / keysArr.length);
        }

        else if(script.blockType === "complex"){
            //{вес блока}*{количество слов в итоговом файле}/({количество слов условного блока}*{количество слов в блоке})
            return (Math.round( ( script.weight * simpleWordsCount / (keysArr.length * script.words.length))));
            //resolve (Math.round( ( (simpleWordsCount / (keyCount * script.words.length) ) * script.weight) ) )
        }

        else if(script.blockType === "special"){
            //{Вес особого блока} - {Количество найденных слов}*{Вес особого блока}/{количество слов в блоке}
            if(script.weight - simpleWordsCount * script.weight / script.words.length < 0) return 0;
            return( script.weight - simpleWordsCount * script.weight / script.words.length );
        }

        return 0;

};