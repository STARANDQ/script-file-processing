module.exports = function(req, res) {
    let script = {
        conditionalBlock:req.body.conditionalBlock,
        words: req.body.Words.split("\r\n"),
        blockType: req.body.blockType,
        text: req.body.TextFileAll,
        weight: +req.body.weight,
        keywordsBlock: req.body.keywordsBlock,
        coefficient: req.body.coefficient
    }

    res.send({
        Success: "removeLoading",
        resultWeight: checkBlockData(script)
    });

};