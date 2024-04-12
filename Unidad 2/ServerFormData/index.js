const express = require('express');
const multer = require('multer');

const app = express();

//Multer
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage });
  app.post('/upload', upload.single('file'), (req, res) => {
    // El archivo se ha recibido y guardado en ./uploads
    res.send('Archivo recibido');
  });

//Formidable
  const formidable = require('formidable');

app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.send('Error al recibir el archivo');
      return;
    }
    // El archivo se ha recibido y se encuentra en files.file
    res.send('Archivo recibido');
  });
});

//Busboy 
const busboy = require('busboy');

app.post('/upload', (req, res) => {
  const busboy = new busboy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename) => {
    // Guardar el archivo
    file.pipe(fs.createWriteStream(`./uploads/${filename}`));
    // El archivo se ha recibido y se está guardando
    res.send('Archivo recibido');
  });
  busboy.on('finish', () => {
    // Finalización de la recepción del archivo
    res.end();
  });

  req.pipe(busboy);
});

//MultiParty
const multiparty = require('multiparty');

app.post('/upload', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.send('Error al recibir el archivo');
      return;
    }
    // El archivo se ha recibido y se encuentra en files.file
    res.send('Archivo recibido');
  });
});


