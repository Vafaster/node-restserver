require('./config/config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/users.js'));


  mongoose.connect('mongodb://localhost:27017/cafedb', (err,resp)=>{
    if(err)
     throw err;
    else
    console.log('Base de Datos ONLINE');
  });

  




app.listen(process.env.PORT,() => {
    console.log("Escuchando por el puerto : ", process.env.PORT);
});