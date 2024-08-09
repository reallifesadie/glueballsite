// GET – Allows you to retrieve a list or collection
// POST – Helps you in creating a  new item in collection
// PUT – Replaces an item with another item in parameters
// PATCH – Enables you to update an item with information in parameters
// DELETE – Enables you to remove item or collection

module.exports.run = (api, req,res,db) => {
    res.send(JSON.stringify({data: "OK!"}));
}

module.exports.help = {
    
}