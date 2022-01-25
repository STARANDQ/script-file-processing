module.exports = function(req, res) {
    Script.find({ }, (err, data) => {
        return res.render('scripts.ejs', {
            "data": data,
            "userId": req.session.userId,
            "status": "Действителен"
        });
    });
};