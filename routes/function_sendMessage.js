module.exports = async function(to_, subject_, text_, html_) {
    if(EmailSend) await transporter.sendMail({
        from: EmailSender, // sender address
        to: to_, // list of receivers
        subject: subject_, // Subject line
        text: "<pre>" + text_ + "</pre>", // plain text body
        html: "<pre>" + html_ + "</pre>", // html body
    });
    else Logger.Warn(Logger.Mode.EMAIL, "Sending messages is disabled in the settings!")
};