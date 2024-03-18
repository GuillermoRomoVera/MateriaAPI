const express = require('express');
const path = require("path")
const app = express()


app.get('/download', (req, res, next) => {
  res.download(path.join(__dirname, '/imagenes/tec.png'));
})

app.get('/send', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/imagenes/tec.png'));
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000');
});