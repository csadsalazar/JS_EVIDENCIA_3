const mongoose = require('mongoose')

//Definir un modelo solo para Mongo
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        unique : true,
        required : [true ,"el curso ya está repetido o no tiene nombre" ],
        maxlength:  [30 , "El titulo solo debe tener 30 caracteres"],
        minlenght: [10, "El titulo minimo debe tener 10 caracteres"] 
    },
    description:{
        type: String,
        required : [true ,"el curso ya está repetido o no tiene descripcion" ],
        minlenght: [10 , "La descripcion debe tener minimo 10 caracteres"]
    },
    weeks:{
        type: Number,
        required : [true ,"Tiene que especificar las semanas" ],
        validate: {
            validator: Number.isInteger,
            message: "Las semanas deben ser un número entero"
        },
        min: [1 , "El curso debe durar minimo 1 semana"],
        max: [9 , "El curso debe durar maximo 9 semanas"]
    },
    enroll_cost:{
        type: Number,
        required : [true ,"el curso debe tener un costo de inscripcion" ]
    },
    minimum_skill:{
        type: String,
        required : [true ,"El valor a ingresar debe ser alguno, y solo alguno de los siguientes -Beginner -Intermediate -Advanced -Expert" ],
        enum:["Beginner ", 
            "Intermediate",
            "Advanced",
            "Expert"]
    },
 
})
const Course = mongoose.model("Course", courseSchema)
module.exports = Course
