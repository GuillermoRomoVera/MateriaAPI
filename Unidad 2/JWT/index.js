const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

let app = express();
app.use(express.json());

app.post('/login',function(req,res,next){
    var token = jsonwebtoken.sign(req.body,'clavesecreta');
    res.json(token);
});

app.get('/user',verifyt, function (req, res, next){
        res.json({mensaje:"Acceso permitido"});
});

app.listen(3000, function(){
        console.log("Servidor escuchando.");
});

function verifyt(req,res, next){
    let token = req.headers.authorization.substring(7,req.headers.authorization.length);
    jsonwebtoken.verify(token,'clavesecreta', function(err, decoded){
        if (err) {
            res.json({Error:"Accesos denegado"})
        }else{
            next();
        }
    })
}