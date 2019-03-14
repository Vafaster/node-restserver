const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
    values:['ADMIN_ROLE', 'USER_ROLE'],
    message:'{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true,'El nombre es obligatorio']
    },
    email: {
        type: String,
        unique:true,
        require: [true, 'Email obligatorio']
    },
    password: {
        type: String,
        require: [true, 'Password obligatorio']
    },
    img: {
        type: String,
        require: true
    },
    role:{
        type: String,
        default: 'USER_ROL',
        enum: validRoles
    },
    estado:{
        type: Boolean,
        default: true

    },
    google:{
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJson = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
});
module.exports = mongoose.model('Usuario', usuarioSchema);