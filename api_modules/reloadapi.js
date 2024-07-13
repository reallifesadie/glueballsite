module.exports.run = (api, req,res,db) => {
    api.loadapi("./api_modules");
    res.send(JSON.stringify({data: "WIP!"}))
}