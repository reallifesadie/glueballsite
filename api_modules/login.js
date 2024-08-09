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

module.exports.run = (api, req,res,db) => {
    switch(req.method) {
        case "POST":
            console.log(req.body)
            console.log(req.cookies) 
            res.send(JSON.stringify({data: "AAAAAAAAAAAAAAA!"}))   
            break;
        case "GET":
            res.send(JSON.stringify({data: "Test2!"}))
            break;
    }
}

module.exports.help = {
    
}