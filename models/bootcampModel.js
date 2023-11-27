const mongoose = require('mongoose')

//Definir un modelo solo para Mongo
const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        unique : true,
        required : [true ,"el bootcamp ya está repetido o no tiene nombre" ],
        maxlength:  [20 , "El Nombre solo debe tener 20 caracteres"]
    },
    phone:{
        type: Number,
        required : [true ,"el bootcamp ya está repetido o no tiene numero" ],
        max: [9999999999 , "El Telefono  solo debe tener 10 caracteres"]
    },
    address:{
        type: String,
        required : [true ,"direccion requeridad o no tiene correo" ],
    },
    topics:{
        type: [String],
        required : [true ,"El valor a ingresar debe ser alguno de los siguientes -AI -BackEnd -Front End -Devops" ],
        enum:["AI ",
            "BackEnd",
            "Front End",
            "Devops"]
    },
    averageRating : Number,
    createdAt:{
        type:Date,
        default: Date.now
    }
})
const Bootcamp = mongoose.model("Bootcamp",bootcampSchema)
module.exports = Bootcamp
