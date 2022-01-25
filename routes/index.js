const express = require('express');
const router = express.Router();
const multer = require("multer");
global.fs = require("fs");
const util = require('util');
const url = require("url");

global.Logger = require('../Logger');

global.User = require('../models/user');
global.Script = require('../models/script');
global.FileData = require('../models/file');
global.ResultFile = require('../models/resultFile');
global.History = require('../models/history');
global.Result = require('../models/result');
global.path = require("path");
global.nodemailer = require("nodemailer");

const SETTINGS = JSON.parse(fs.readFileSync('./settings.json'));

global.LoggerScript = SETTINGS.LoggerScript;

const EmailHost = SETTINGS.email.host;
const EmailPort = SETTINGS.email.port;
const EmailSecure = SETTINGS.email.secure;
const EmailUser = SETTINGS.email.auth.user;
const EmailPassword = SETTINGS.email.auth.pass;
global.EmailSender = SETTINGS.email.sender;
global.EmailSend = SETTINGS.email.send;

global.transporter = nodemailer.createTransport({
	host: EmailHost,
	port: EmailPort,
	secure: EmailSecure, // true for 465, false for other ports
	auth: {
		user: EmailUser,
		pass: EmailPassword
	},
});

// Connectors

// GET
const get_register = require("./get_register");
const get_clearAll = require("./get_clearAll");
const get_result = require("./get_result");
const get_files = require("./get_files");
const get_userInfo = require("./get_userInfo");
const get_scriptStatus = require("./get_scriptStatus");
const get_logout = require("./get_logout");
const get_sendMessage = require("./get_sendMessage");
const get_employeeList = require("./get_employeeList");
const get_userAll = require("./get_userAll");
const get_profileAll = require("./get_profileAll");
const get_profile = require("./get_profile");
const get_login = require("./get_login");
const get_scripts = require("./get_scripts");
const get_testing = require("./get_testing");
const get_stats = require("./get_stats");

// POST
const post_register = require("./post_register");
const post_upload = require("./post_upload");
const post_userInfo = require("./post_userInfo");
const post_scriptStatus = require("./post_scriptStatus");
const post_scriptCombine = require("./post_scriptCombine");
const post_sendMessage = require("./post_sendMessage");
const post_editProfile = require("./post_editProfile");
const post_login = require("./post_login");
const post_editScriptStatus = require("./post_editScriptStatus");
const post_addScript = require("./post_addScript");
const post_fileInfo = require("./post_fileInfo");
const post_testing = require("./post_testing");

// FUNCTION
global.getFileUserName = require("./function_getFileUserName");
global.scriptResult = require("./function_scriptResult");
global.checkFileName = require("./function_checkFileName");
global.getId = require("./function_getId");
global.getFiles = require("./function_getFiles");
global.getDateWithoutTime = require("./function_getDateWithoutTime");
global.processFile = require("./function_processFile");
global.proportion = require("./function_proportion");
global.sendMessage = require("./function_sendMessage");
global.getDateNow = require("./function_getDateNow");
global.generateName = require("./function_generateName");
global.getRandomInt = require("./function_getRandomInt");
global.checkFileArray = require("./function_checkFileArray");
global.getSearchFile = require("./function_getSearchFile");
global.combineFiles = require("./function_combineFiles");
global.getResultFile = require("./function_getResultFile");
global.checkFileInfo = require("./function_checkFileInfo");
global.checkBlockData = require("./function_checkBlockData");
global.checkConditional = require("./function_checkConditional");
global.checkNormal = require("./function_checkNormal");

let scriptStatus = true;
let dataStartScripts = getDateNow();

let profileID = "";

let dataProfiles = [];
let dataScript = [];
let dataFiles = [];

router.get('/stats', (req, res, next) => {get_stats(req, res);});

router.get('/testing', (req, res, next) => {get_testing(req, res);});
router.post('/testing', (req, res, next) => {post_testing(req, res);});

/* [ - - - - - Фича - - - - - ] */
router.get('/clearAll', (req, res, next) => {get_clearAll(res);});

/* [ - - - - - RESULT - - - - - ] */
router.get('/result', (req, res, next) => {get_result(res);});

/* [ - - - - - REGISTER - - - - - ] */
router.get('/register', (req, res, next) => {get_register(res, req, dataProfiles, dataScript);});
router.post('/register', (req, res, next) => {post_register(req, res);});

/* [ - - - - - FILES - - - - - ] */
router.get('/files', (req, res, next) => {get_files(res, req);});
const upload = multer({ dest: 'uploads/' })
router.post('/upload', upload.array('uploadFile', 50), function (req, res, next) {post_upload(req, res);})

/* [ - - - - - USER INFO - - - - - ] */
router.get('/userInfo', (req, res, next) => {get_userInfo(res, req);});
router.post('/userInfo', (req, res, next) => {post_userInfo(req, res);});

/* [ - - - - - SCRIPT STATUS - - - - - ] */
router.get('/scriptStatus', (req, res, next) => {get_scriptStatus(res, scriptStatus, dataStartScripts);});
router.post('/scriptStatus', async (req, res, next) => {await post_scriptStatus(path, res);});
router.post('/scriptCombine', (req, res, next) => {post_scriptCombine(dataStartScripts, res);});

/* [ - - - - - SCRIPTS - - - - - ] */
router.get('/scripts', (req, res, next) => {get_scripts(req, res);});
router.post('/fileInfo', (req, res, next) => {post_fileInfo(req, res);});
router.post('/addScript', (req, res, next) => {post_addScript(req, res);});
router.post('/editScriptStatus', (req, res, next) => {post_editScriptStatus(req, res);});

/* [ - - - - - LOGIN - - - - - ] */
router.get('/login', (req, res, next) => {get_login(req, res);});
router.post('/login', (req, res, next) => {post_login(req, res);});

/* [ - - - - - PROFILE - - - - - ] */
router.get('/profile', (req, res, next) => {get_profile(res, req)});

/* [ - - - - - EDIT PROFILE - - - - - ] */
router.get('/profile/*', (req, res, next) => {get_profileAll(profileID, req, dataProfiles, dataScript, res);});
router.post('/editProfile', (req, res, next) => {post_editProfile(req, res);});

/* [ - - - - - USER INFO - - - - - ] */
router.get('/user/*', (req, res, next) => {get_userAll(profileID, dataFiles, req, res);});

/* [ - - - - - EMPLOYEE LIST - - - - - ] */
router.get('/employeeList', (req, res, next) => {get_employeeList(req, res);});

/* [ - - - - - SEND MESSAGE - - - - - ] */
router.get('/sendMessage', (req, res, next) => {get_sendMessage(res);});
router.post('/sendMessage', (req, res, next) => {post_sendMessage(req);});

/* [ - - - - - LOGOUT - - - - - ] */
router.get('/logout', (req, res, next) => {get_logout(req, res, next)});

module.exports = router;

/*
async function checkFileInfo(n,dataFile){
	if (n === -1){
		console.log("FINISH".america);
		return n;
	}
	else{
		await checkFileInfo(n - 1, dataFile);
	}
}
 */