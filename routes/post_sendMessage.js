module.exports = function(req) {
    sendMessage(req.body.EmailUser, req.body.Subject, req.body.text, req.body.text).then(() => {
        Logger.Message(Logger.Mode.EMAIL, "Send message. Email: " + req.body.EmailUser);
    });
};