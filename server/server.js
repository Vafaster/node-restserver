require('./config/config.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/usuario', (req, res) => {
  res.send('get Usuario')
})
 
app.post('/usuario', (req, res) => 
{
    let body =  req.body;
    if(body.nombre === undefined){
     res.status(400).json({
         ok:false,
         msg:"Missing field nombre"
     })
    }else
       res.send({body})
     
    
  })

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.send(`put Usuario con param id= ${id}`)
  })

app.delete('/usuario', (req, res) => {
    res.send('delete Usuario')
  })

app.listen(process.env.PORT,() => {
    console.log("Escuchando por el puerto : ", process.env.PORT);
});