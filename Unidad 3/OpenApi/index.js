const express = require('express');
const app = express();
const mysql = require('mysql2');
const swaggerUI = require('swagger-ui-express'); 
const swaggerJsDoc  = require('swagger-jsdoc'); 
const path = require('path');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'datos'
});

app.use(express.json());

 /** 
 * 
@swagger 
 * /usuario: 
 *   get: 
 *     description: Welcome to swagger-jsdoc! 
 *     responses: 
 *       200: 
 *         description: Returns a mysterious string. 
 */ 
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

/** 
 * 
@swagger 
 * /usuario: 
 *   post: 
 *     description: Welcome to swagger-jsdoc! 
 *     responses: 
 *       200: 
 *         description: Returns a mysterious string. 
 */ 
//INSERTAR
app.post('/usuario', async (req, res) => {
  try {
    const { Nombre, Apellido} = req.body;
    
    connection.query(
      'INSERT INTO usuario (Nombre, Apellido) VALUES (?, ?)',
      [Nombre, Apellido]
    );
    
    res.status(201).json({ message: 'Usuario agregado' });
  } catch (error) {
    console.error('Error al agregar:', error);
    res.status(404).json({ error: 'Error al agregar al libro' });
  } finally {
    connection.end();
  }
});

/** 
 * 
@swagger 
 * /usuario: 
 *   delete: 
 *     description: Welcome to swagger-jsdoc! 
 *     responses: 
 *       200: 
 *         description: Returns a mysterious string. 
 */ 
//ELIMINAR
app.delete('/usuario/:idUsuario', async (req, res) => {
  try {
    const idLibro = req.params.idLibro;
    
    connection.query(
      'DELETE FROM usuario WHERE idUusario = ?',
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
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

/** 
 * 
@swagger 
 * /usuario: 
 *   put: 
 *     description: Welcome to swagger-jsdoc! 
 *     responses: 
 *       200: 
 *         description: Returns a mysterious string. 
 */ 
//ACTUALIZAR
app.put('/usuario/:idUsuario', async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const { Nombre, Apellido} = req.body;
    
    connection.query(
      'UPDATE usuario SET Nombre = ?, Apellido = ? WHERE idUsuario = ?',
      [Nombre, Apellido],
      (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'No se pudo actualizar' });
        } else {
          res.json({ message: 'Usuario actualizado' });
        }
      }
    );
  } catch (error) {
    console.error('Error al actualizar el Usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el Usuario' });
  }
});


const swaggerOptions = { 
  definition: { 
  openapi: '3.0.0', 
  info: { 
  title: 'API Empleados', 
  version: '1.0.0', 
        }, 
  servers:[ 
              {url: 
  "http://localhost:8081"} 
          ],   
      }, 
  apis: [`${path.join(__dirname,"./index.js")}`], 
    };
    const swaggerDocs = swaggerJsDoc(swaggerOptions); 
    app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs)); 



app.listen(3000, () => {
  console.log('listening on port 8081!');
})
module.exports = app;