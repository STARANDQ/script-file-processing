module.exports = function(script) {
        console.log(script);
        if(script.conditionalBlock === ''){
                return checkNormal(script);
        }else{
            return checkConditional(script);
        }

};