const express = require('express');
const https = require("https");
const fs = require('fs');
const path = require('path');

const opciones = {
   key: fs.readFileSync(path.join(__dirname,"key/key.pem")),
   cert:fs.readFileSync(path.join(__dirname, "key/cert.pem"))
}
const app = express();
    app.get('/', function (req, res) {
    res.send("Mensaje enviado");
});

/*app.listen(3000, () => {
    console.log("Servidor escuchando bad bunny en el puerto 3000");
})*/

https.createServer(opciones,app).listen(3000,function(){
    console.log("El Servidor Express seguro en puerto 3000");
});
