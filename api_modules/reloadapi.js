module.exports.run = (api, req,res,db) => {
    console.log("Reloading API Modules!")
    api.loadapi("./api_modules");
    res.send(JSON.stringify({data: "Done!"}));
}