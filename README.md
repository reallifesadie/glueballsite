# glueballsite
Lots of functions, one server... why t-t

To start, clone the repository!
Next, npm install in the directory
You will need to create a config.json file, it will look like this:
```js
{
    "key": "path to key file",
    "cert": "path to cert file"
}
```


next you will need those key and cert files
letsencrypt is pretty cool but for a home project you can make ur own.
put them in the data folder
```bash
cd .data/
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 -nodes
```