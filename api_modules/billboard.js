module.exports.run = (api, req,res,db) => {
    switch(req.method) {
        case "GET":
            var spliturl = req.url.split(/[#?]+/)[0]
            let yeee = spliturl.split("/"); yeee.shift();
            if (yeee.length > 2) {
                res.send(JSON.stringify({data: "BICTHN!"}));
            } else {
                res.send(JSON.stringify({data: "FUCK!"}));
            }
            break;
    }
}
