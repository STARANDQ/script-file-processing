const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Logger = require('./Logger');
const fs = require('fs');

let SETTINGS = JSON.parse(fs.readFileSync('settings.json'));

let MongoDBURI = null;

if(SETTINGS.mongo === "local") MongoDBURI = process.env.MONGO_URI || 'mongodb://localhost/ScriptBD';
if(SETTINGS.mongo === "web") MongoDBURI = "mongodb+srv://starandq:qwerty123@cluster0.1uw1r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

const index = require('./routes');
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3300
let port = process.env.PORT || (SETTINGS.serverPort);
app.listen(port, () => {
  Logger.Warn(Logger.Mode.SERVER, 'Express app listening on port ' + port);
});