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

if(!(config.key || config.cert)) {
	console.error(new Error("Please define cert files in your config file"));
	return 0;
} else if(!(fs.existsSync(config.key ) || fs.existsSync(config.cert))) {
	console.error(new Error("Certificate files not detected!"));
	return 0;
} 

// This class runs the API modules functionality.
class api_modules {
	constructor(moduleLocation) {
		this.loadapi(moduleLocation);
	}
	loadapi(moduleLocation) {
		this.module = [];
		fs.readdir(moduleLocation, (err, files) => { //Snag files
			if(err) return console.error(err);
			let offset = 0;
			files.forEach((file, fnum) =>{ 
				if (!file.endsWith('js')) {
					offset--
					return;
				};
				try {
					if (require.cache[require.resolve(`${moduleLocation}/${file}`)]) delete require.cache[require.resolve(`${moduleLocation}/${file}`)];
					this.module[file.slice(0, file.lastIndexOf("."))] = require(`${moduleLocation}/${file}`);
					console.log(`${fnum + 1 + offset}: API Module <${file.slice(0, file.lastIndexOf("."))}> loaded.`) //say I did it, loaded the file!
				} catch (err) { console.error(err) } //woops err
			});
		});		
	}
	initdb(moduleLocation) {
		let dbinitfunc = [];
		fs.readdir(moduleLocation, (err, files) => {
			if(err) return console.error(err);
			let offset = 0;
			files.forEach((file, fnum) =>{ 
				if (!file.endsWith('js')) {
					offset--
					return;
				}
				try {
					require(`${moduleLocation}/${file}`).run(this,db);
					console.log(`${fnum + 1 + offset}: DB Module <${file.slice(0, file.lastIndexOf("."))}> initalized.`) //say I did it, loaded the file!
				} catch (err) { console.error(err) } //woops err
			});
		})
	}
}

var api = new api_modules("./api_modules");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// This should listen on http and redirect to https.
http.get('*', function(request, response) {  
	response.redirect('https://' + request.hostname + `:${config.https || 3005}` + request.url);
});					

// This is the part that does the website stuff!
app.all("*", (req, res) => {
	//This cuts off the end if after ? or #
	var spliturl = req.url.split(/[#?]+/)[0]
	if (req.url.startsWith("/api")) {
		// This runs the api modules!
		let yeee = spliturl.split("/"); yeee.shift();
		if(api.module[yeee[1]]) {
			api.module[yeee[1]].run(api, req, res, db);
		} else {
			res.send(JSON.stringify({"data": "Invalad API call"}));
		}
	}else if(respondto[spliturl]){
		// Or sends a website as outlined in responses
		res.sendFile(__dirname+respondto[spliturl]);
	} else {
		// Or if all else fails 404 page
		res.sendFile(__dirname+respondto["/404"]);
	}
});


// http listens op port defined as http in config.
var httpListener = http.listen(config.http || 3000, () => {
	console.log(`Your app is listening on port ${httpListener.address().port}`);
});

var listener = https.createServer({
key: fs.readFileSync(config.key),
cert: fs.readFileSync(config.cert)
}, app).listen(config.https || 3005, () => {
	console.log(`Your app is listening on port ${listener.address().port}`);
});

// Does .data/ exist?
const dataFolder = "./.data"
if(!fs.existsSync(dataFolder)) {
	fs.mkdirSync(dataFolder);
	console.log("Created directory .data")
}
// init sqlite db
const dbFile = "db.db";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(`${dataFolder}/${dbFile}`);
//"CREATE TABLE users (id TEXT, username TEXT, password TEXT)"
// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(() => {
	// if the database doesn't exist create it and create a test profile. Why root? Idk I guess I'm braindead...
	if (!fs.existsSync(`${dataFolder}/${dbFile}`)) {
		db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, name TEXT, password TEXT, code TEXT)", (err, table) => {
			if(!err) {
				console.log("New table 'users' created! (username, name, password, code)");
			} else console.error(err)
		});
	} else { 
		console.log('Database ready to go!');
	}
	api.initdb("./db_modules");
});

// helper function that prevents html/css/script malice
const cleanseString = (string) => {
	return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};


