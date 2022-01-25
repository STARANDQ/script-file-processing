const colors = require('colors');
const fs = require('fs');

let SETTINGS = JSON.parse(fs.readFileSync('settings.json'));

class Logger{
    static Message(title, text){
        if(SETTINGS.Logger) console.log(this.getDateNow().magenta + " " + title + " " + text);
    }

    static Warn(title, text){
        if(SETTINGS.Logger) console.log(this.getDateNow().magenta +  " " + title + " " + ("[ WARN ] ").yellow  + text);
    }

    static Error(title, text){
        console.log(this.getDateNow().magenta + " " + title + " " + ("[ ERROR ] ").red + (text).toString().red);
    }

    static getDateNow(){
        let date = new Date();
        return date.toDateString() + " | " + date.toLocaleTimeString();
    }


    // red | green | yellow | blue | magenta | cyan | gray
    static Mode = {
        SERVER: "[ Server ]".green,
        REGISTER: "[ Register ]".cyan,
        REMOVE: "[ Remove ]".cyan,
        EDIT: "[ Edit ]".cyan,
        LOGIN: "[ Login ]".blue,
        FILE: "[ File ]".yellow,
        HISTORY: "[ History ]".yellow,
        SCRIPT: "[ Script ]".green,
        TEST: "[ Test ]".gray,
        EMAIL: "[ Email ]".cyan,
        RESULT: "[ Result ]".green
    }
}

module.exports = Logger;