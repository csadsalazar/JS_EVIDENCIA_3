const express = require('express')
const reviewModel = require("../models/reviewModel")
const mongoose = require('mongoose')
const router = express.Router()


router.get('/', async (req,res) => {
    //traigo todos los reviews
    try {
        //validar id para mongo
        const reviews = await reviewModel.find()
        if(reviews.length === 0){
                    res.
                        status(400).
                        json({
                            success:false,
                            msg: 'No hay reviews'
                    })
        }else{
                    res.
                        status(200).
                        json({
                            success:true,
                            data: reviews
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

//Traer review por id: 
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
        const review = await reviewModel.findById(req.params.id)
        if(!review){
            res.
                status(400).
                json({
                    success:false,
                    msg: 'No hay reviews'
            })
        }else{
            res.
                status(200).
                json({
                    success:true,
                    data: review
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
            const review = await reviewModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            if (!review) {
            //no existe review
            res.
                status(400).
                json({
                    success:false,
                    msg: `No existe el review ${req.params.id}`
        })
            } else {
            //si existe review
            res.
                status(200).
                json({
                    success:true,
                    data: review
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
        const review = await reviewModel.create(req.body)
        res.status(201).json({
            success:true,
            data: review
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
            const review = await reviewModel.findByIdAndDelete(req.params.id)
             if (!review) {
            //no existe review
            res.
                status(400).
                json({
                    success:false,
                    msg: `No existe el review ${req.params.id}`
        })
            } else {
            //si existe review
            res.
                status(200).
                json({
                    success:true,
                    data: review
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