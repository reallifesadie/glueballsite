// GET – Allows you to retrieve a list or collection
// POST – Helps you in creating a  new item in collection
// PUT –Replaces an item with another item in parameters
// PATCH – Enables you to update an item with information in parameters
// DELETE – Enables you to remove item or collection

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

// fetch('/api/login', {
//     method: 'POST',
//   credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({test2: "test2"})
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data));