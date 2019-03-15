const express = require('express');
const Usuario = require('../models/cuser');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/usuario', (req, res) => {

    let from = req.query._from || 0;
    from = Number(from);

    let limit = req.query._limit || 5;
    limit = Number(limit);

    query = { estado:true};

    Usuario.find(query,'nombre email estado google img')
            .skip(from)
            .limit(limit)
            .exec( (err, usuarios) => {
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count(query,(err,count)=>{
                    return res.json({
                        ok: true,
                        usuarios,
                        Total_User: count
                 });

                });

                
            })
    
})
   
app.post('/usuario', (req, res) => {
      let body =  req.body;

      let usuario = new Usuario({
          nombre: body.nombre,
          email: body.email,
          password: bcrypt.hashSync(body.password,10),
          role:body.role
      });

      usuario.save( (err,usuarioDB) => {
         if(err) {
             return res.status(400).json({
                 ok: false,
                 err
             });
         }

         res.json({
             ok:true,
             usuario: usuarioDB
         });
      });
       
      
})
  
app.put('/usuario/:id', (req, res) => {
      let id = req.params.id;
      let fieldsUser= ['nombre', 'email', 'img', 'role', 'estado'];
      let body = _.pick(req.body,fieldsUser);

      Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, usuarioDB)=>{

      if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            of: true,
            usuario: usuarioDB
        });

      });

      
})
  
app.delete('/usuario/:id', (req, res) => {
    let id =req.params.id;
    let body = {estado: false};
    Usuario.findByIdAndUpdate(id, body, (err, usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err: {
                    mensage: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok:true,
            usuario:usuarioDB
        });

    })
     
})
  

module.exports = app;