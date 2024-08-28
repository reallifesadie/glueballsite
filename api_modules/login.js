// GET – Allows you to retrieve a list or collection
//  - Login  with cookies?
// POST – Helps you in creating a  new item in collection
//  - New User
//   - Username Password DisplayName
// PUT – Replaces an item with another item in parameters
//  - Login
//   - Username Password
// PATCH – Enables you to update an item with information in parameters
//  - Update info
//   - Username Password DisplayName(optinal)
// DELETE – Enables you to remove item or collection
//  - Delete Account

//For the hashing stuff
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

// A function that will return false if the list provided has undefined or empty vars
const ZippoSwappo = (funkyList) => {
    for(let i = 0; i < funkyList.length; i++) {
        if(!funkyList[i] || funkyList[i] == "") {
            return false;
        }
    }
    return true;
}
module.exports.run = (api,req,res,db) => {
    switch(req.method) {
        case "POST":
            // ZIPPO SWAPPO 
            if(!ZippoSwappo([req.body.data.username, req.body.data.displayname, req.body.data.password])) {
                res.send(JSON.stringify({data: "Please include username password and displayname!"}));
                break;
            }
            db.get("SELECT username FROM users WHERE username = ?", [req.body.data.username], (err, row) => {
                if(err) return console.error(err);
                if(row == undefined) {
                    bcrypt.hash(req.body.data.password, saltRounds, function(err, hash) {
                        if(err) return console.error(err);
                        db.run('INSERT INTO users (username, password) VALUES (?,?)', [req.body.data.username, hash], (err, row) => {
                            if(err) return console.error(err);
                            console.log(`New user ${req.body.data.username} created!`);
                        });
                    });
                } else {
                    console.log("username allready exists")
                    //res.send(JSON.stringify({data: `Username ` + req.body.data.username + ` already exists!`}));
                }
            });
            
            res.send(JSON.stringify({data: "OK! 👍"}));
            break;
        case "GET":
            res.send(JSON.stringify({data: "Test2!"}));
            break;
    }
}