const express = require('express')
const courseModel = require("../models/courseModel")
const mongoose = require('mongoose')
const router = express.Router()


router.get('/', async (req,res) => {
    //traigo todos los cursos
    try {
        //validar id para mongo
        const courses = await courseModel.find()
        if(courses.length === 0){
                    res.
                        status(400).
                        json({
                            success:false,
                            msg: 'No hay cursos'
                    })
        }else{
                    res.
                        status(200).
                        json({
                            success:true,
                            data: courses
                    })
                }
        }catch (error) {   
                res.
                    status(500).
                    json({
                        success:false,
                        msg: `Error interno de servidor ${error.message}`
                    })
            }
        })

//Traer curso por id: 
router.get('/:id', async (req,res)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.
                status(400).
                json({
                    success:false,
                    msg: 'Id invalido'
    })
        }else{
        const course = await courseModel.findById(req.params.id)
        if(!course){
            res.
                status(400).
                json({
                    success:false,
                    msg: 'No hay cursos'
            })
        }else{
            res.
                status(200).
                json({
                    success:true,
                    data: course
            })
        }
    }
    } catch (error) {
        res.
        status(500).
        json({
            success:false,
            msg: `Error interno de servidor ${error.message}`
        })
    }
})

router.put ('/:id', async(req,res)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.
                status(400).
                json({
                    success:false,
                    msg: 'Id invalido'
            })
        }else{
            const course = await courseModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            if (!course) {
            //no existe curso
            res.
                status(400).
                json({
                    success:false,
                    msg: `No existe el curso ${req.params.id}`
        })
            } else {
            //si existe curso
            res.
                status(200).
                json({
                    success:true,
                    data: course
                })
            }
        } 
    } catch (error) {
        res.
            status(500).
            json({
                success:false,
                msg: `Error interno de servidor ${error.message}`
        })
    }
})

router.post ('/', async (req,res)=>{
    try {
        const course = await courseModel.create(req.body)
        res.status(201).json({
            success:true,
            data: course
        }) 
    } catch (error) {
        res.
        status(500).
        json({
            success:false,
            msg: `${error.message}`
        })
    }
})

router.delete ('/:id', async(req,res)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.
                status(400).
                json({
                    success:false,
                    msg: 'Id invalido'
            })
        }else{
            const course = await courseModel.findByIdAndDelete(req.params.id)
             if (!course) {
            //no existe curso
            res.
                status(400).
                json({
                    success:false,
                    msg: `No existe el curso ${req.params.id}`
        })
            } else {
            //si existe curso
            res.
                status(200).
                json({
                    success:true,
                    data: course
                })
            }
        } 
    } catch (error) {
        res.
            status(500).
            json({
                success:false,
                msg: `Error interno de servidor ${error.message}`
            })
    }
})

module.exports = router