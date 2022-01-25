module.exports = function(req, res) {
    Script.findOne({}, (err, data) => {
        let newScript = new Script({
            unique_id: getId(data),
            name: req.body.name,
            script: req.body.result,
            status: "Действителен",
            keywordsBlock: req.body.keywordsBlock,
            coefficient: req.body.coefficient
        });

        newScript.save((err, Script) => {
            if (err) Logger.Error(Logger.Mode.SCRIPT, err);
            else
                Logger.Message(Logger.Mode.SCRIPT, "Add script '" + Script.name + "'");
        });

    }).sort({ _id: -1 }).limit(1);
    res.send({ "Success": "reload" });
};