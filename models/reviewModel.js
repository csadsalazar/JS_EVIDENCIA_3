const mongoose = require('mongoose')

//Definir un modelo solo para Mongo
const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required : [true ,"Debe haber un titulo para la reseña" ],
        maxlength:  [20 , "EL titulo solo debe tener 20 caracteres"]
    },
    text:{
        type: String,
        required : [true ,"Debe haber un texto para la reseña" ],
        maxlength: [50 , "Maximo 50 caracteres para el texto"]
    },
    rating:{
        type: Number,
        required : [true ,"Debe de haber una nota" ],
        validate: {
            validator: Number.isInteger,
            message: "La calificacion debe ser un número entero"
        },
        min : [1, "El minimo de una calificacion es 1"],
        max : [10, "El maximo de una calificacion es 10"]
    }
})
const Review = mongoose.model("Review",reviewSchema)
module.exports = Review
