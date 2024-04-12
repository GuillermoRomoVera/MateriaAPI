const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'datos'
});

app.use(express.json());

//CONSULTA
app.get('/usuario', async (req, res) =>{
  try {
   if (typeof req.query.idUsuario == 'undefined') {
     connection.query('SELECT * FROM usuario', (err, rows) => {
       if (err) throw err;
       res.json(rows);
     });
   } else {
     connection.query(`SELECT * FROM usuario WHERE idUsuario = ${req.query.idUsuario}`, (err, rows) => {
       if (err) throw err;
       if (rows.length === 0) {
         res.status(404).json({ error: 'Usuario no encontrado' });
       } else {
         res.json(rows);
       }
     });
   }
  } catch (error) {
    res.status(500).json({ error: 'Error en la consulta a la base de datos' });
  }
 });


//INSERTAR
app.post('/usuario', [ 
  check('Nombre').isLength({min: 6}).withMessage('Número minimo de caracteres de 6 letras'),
  check('Apellido').isLength({min: 10}).withMessage('Número minimo de caracteres de 10 letras')], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    try {
    const { Nombre, Apellido } = req.body;
    
    connection.query(
      'INSERT INTO usuario (Nombre, Apellido) VALUES (?, ?)',
      [Nombre, Apellido]
    );
    
    res.status(201).json({ message: 'Usuario insertado' });
  } catch (error) {
    console.error('Error al insertar:', error);
    res.status(404).json({ error: 'Error al agregar el usuario' });
  }
});


//ELIMINAR
app.delete('/usuario/:idUsuario', async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    
    connection.query(
      'DELETE FROM usuario WHERE idUsuario = ?',
      [idUsuario],
      (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Ya esta eliminado' });
        } else {
          res.json({ message: 'Usuario eliminado' });
        }
      }
    );
  } catch (error) {
    console.error('Error al eliminar:', error);
    res.status(500).json({ error: 'Error al eliminar el Usuario' });
  }
});

//ACTUALIZAR
app.put('/usuario/:idUsuario', async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const { Nombre, Apellido } = req.body;
    
    connection.query(
      'UPDATE usuario SET Nombre = ?, Apellido = ? WHERE idUsuario = ?',
      [Nombre, Apellido, idUsuario],
      (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'no se pudo actualizar' });
        } else {
          res.json({ message: 'Usuario actualizado' });
        }
      }
    );
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});



app.listen(3000, () => {
  console.log('listening on port 3000!');
});