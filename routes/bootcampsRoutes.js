const express = require('express')
const bootcampModel = require("../models/bootcampModel")
const mongoose = require('mongoose')
const router = express.Router()


router.get('/', async (req,res) => {
    //traigo todos los bootcamps
    try {
        //validar id para mongo
        const bootcamps = await bootcampModel.find()
        if(bootcamps.length === 0){
                    res.
                        status(400).
                        json({
                            success:false,
                            msg: 'No hay bootcamps'
                    })
        }else{
                    res.
                        status(200).
                        json({
                            success:true,
                            data: bootcamps
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

//Traer bootcamp por id: 
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
        const bootcamp = await bootcampModel.findById(req.params.id)
        if(!bootcamp){
            res.
                status(400).
                json({
                    success:false,
                    msg: 'No hay bootcamps'
            })
        }else{
            res.
                status(200).
                json({
                    success:true,
                    data: bootcamp
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
            const bootcamp = await bootcampModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            if (!bootcamp) {
            //no existe bootcamp
            res.
                status(400).
                json({
                    success:false,
                    msg: `No existe el bootcamp ${req.params.id}`
        })
            } else {
            //si existe bootcamp
            res.
                status(200).
                json({
                    success:true,
                    data: bootcamp
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
        const newBootcamp = await bootcampModel.create(req.body)
        res.status(201).json({
            success:true,
            data: newBootcamp
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
            const bootcamp = await bootcampModel.findByIdAndDelete(req.params.id)
             if (!bootcamp) {
            //no existe bootcamp
            res.
                status(400).
                json({
                    success:false,
                    msg: `No existe el bootcamp ${req.params.id}`
        })
            } else {
            //si existe bootcamp
            res.
                status(200).
                json({
                    success:true,
                    data: bootcamp
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