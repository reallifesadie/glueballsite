// GET – Allows you to retrieve a list or collection
// POST – Helps you in creating a  new item in collection
// PUT – Replaces an item with another item in parameters
// PATCH – Enables you to update an item with information in parameters
// DELETE – Enables you to remove item or collection

const { json } = require("express");

module.exports.run = (api,req,res,db) => {
    switch(req.method) {
        //Change Color at ID and send color list 
        case "PATCH":
            if(req.body.id > 4800 || req.body.id < 0 || req.body.id == "" || req.body.id == undefined) {
                res.send(JSON.stringify({data: `ID ${req.body.id} INVALID`}));
                break;
            }
            if (!/^#?([a-f0-9]{6})$/.test(req.body.color)) {
                res.send(JSON.stringify({data: `Color ${req.body.color} INVALID`}));
                break;
            }
            db.run(`UPDATE spicy SET color = "${req.body.color}" WHERE id = ${req.body.id}`, (err, table) => {
                if(!err) {
                    db.all("SELECT * FROM spicy", (err2, rows) => {
                        if(!err2) {
                            res.send(JSON.stringify({data: rows}))
                        } else console.error(err2);
                    });
                } else console.error(err);
            });
            break;
        //Send Color List
        case "GET":
            db.all("SELECT * FROM spicy", (err, rows) => {
                if(!err) {
                    res.send(JSON.stringify({data: rows}))
                } else console.error(err);
            });
            break;
    }
    
}