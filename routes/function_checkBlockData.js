module.exports = function(script) {
        if(script.conditionalBlock === ''){
                return checkNormal(script);
        }else{
            return checkConditional(script);
        }

};