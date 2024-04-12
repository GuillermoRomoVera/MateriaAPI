const yaml = require('yaml');
const fs = require('fs');
const path = require('path');
const expres = require('express');
const https = require('https')

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certificado/key.pem'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'certificado/key.pem'), 'utf8')
 };

const varArreglo = yaml.parse(arreglo);
console.log(varArreglo);

app.get('/', (req, res) => {
    res.json({mensaje:'Respondiendo servidor'})
  })
    https.CreateServer(options, app).listen(3000, () => {
    console.log(`Serviddor escuchando al puerto 3000`)
  })