module.exports = function(req, res) {
    Script.updateOne({ unique_id: req.body.id}, {$set: {"status": req.body.status}}, function(err, result){
        Logger.Message(Logger.Mode.SCRIPT, "Status script (id) " + req.body.id + " set '" + req.body.status + "'");
    });
    res.send({ "Success": "reload" });
};