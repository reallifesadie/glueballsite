// Config and stuffs :)
const respondto = require("./respondto.json");
const config = require("./config.json");

// server.js
const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

const app = express();
var http = express();
const fs = require("fs");
var https = require('https');

const { json } = require("express");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

class api_modules {
	constructor(moduleLocation) {
		this.loadapi(moduleLocation);
	}
	loadapi(moduleLocation) {
		this.module = [];
		fs.readdir(moduleLocation, (err, files) => { //Snag files
			console.log(`--\n`)
			files.forEach((file, fnum) =>{ 
				if (!file.endsWith('js')) return;
				try {
					this.module[file.slice(0, file.lastIndexOf("."))] = require(`${moduleLocation}/${file}`);
					console.log(`${fnum + 1}: API Module <${file.slice(0, file.lastIndexOf("."))}> loaded.`) //say I did it, loaded the file!
				} catch (err) { console.error(err) } //woops err
			});
		});		
	}
}

var api = new api_modules("./api_modules");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// This should listen on http and redirect to https.
http.get('*', function(request, response) {  
	response.redirect('https://' + request.headers.host + request.url);
});

app.get("*", (req, res) => {
	var spliturl = req.url.split(/[#?]+/)[0]
	if (req.url.startsWith("/api")) {
		let yeee = spliturl.split("/"); yeee.shift();

		if(api.module[yeee[1]]) {
			api.module[yeee[1]].run(api, req, res, db);
		} else {
			res.send(JSON.stringify({"data": "Invalad API call"}));
		}
	}else if(respondto[spliturl]){
		res.sendFile(__dirname+respondto[spliturl]);
	} else {
		res.sendFile(__dirname+respondto["/404"]);
	}
});

app.post("*", (req, res) => {
	var spliturl = req.url.split(/[#?]+/)[0]
	if (req.url.startsWith("/api")) {
		let yeee = req.url.split("/"); yeee.shift();

		if(api.module[yeee[1]]) {
			api.module[yeee[1]].run(api, req, res, db);
		} else {
			res.send(JSON.stringify({"data": "Invalad API call"}));
		}
	}
});

var httpListener = http.listen(process.env.httpPORT || 80, () => {
	console.log(`Your app is listening on port ${httpListener.address().port}`);
});
var listener = https.createServer({
key: fs.readFileSync(config.key),
cert: fs.readFileSync(config.cert)
}, app).listen(process.env.PORT || 443, () => {
	console.log(`Your app is listening on port ${listener.address().port}`);
});

// init sqlite db
const dbFile = "./.data/db.db";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);
//"CREATE TABLE users (id TEXT, username TEXT, password TEXT)"
// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(() => {
	// if the database doesn't exist create it and create a test profile. Why root? Idk I guess I'm braindead...
	if (!fs.existsSync(dbFile)) {
		db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, fName TEXT, lName TEXT, password TEXT, code TEXT)", (err, table) => {
			if(!err) {
			console.log("New table 'users' created! (username, fName, lName, password TEXT, code TEXT)");
			} else console.error(err)
		});
		// yeah great password, eh?
		db.run('INSERT INTO users (username, password) VALUES (?,?)', ["root", "fuckthisshit"], (err, row) => {
			if(!err) {
				console.log("New user 'root' created!");
			} else console.error(err);
		});
	} else { 
		console.log('Database ready to go!');

		// This will log all users in the db
		// db.each("SELECT username FROM users", (err, row) => {
		//   console.log(row.username)
		// });
	}
});

// helper function that prevents html/css/script malice
const cleanseString = (string) => {
	return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

//Parden my SHIT CODE
// 	db.get(`SELECT username FROM users WHERE username=?`, request.body.username, (err, row) => {
// 		if (!err) {
//			// Come on do something
// 		} else console.error(err)
// 	});
// });


