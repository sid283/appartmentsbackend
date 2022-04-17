const express = require("express")
const Flat = require("../models/flat.model")
const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const flat = await Flat.create(req.body)
        res.send(flat)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.get("/",async(req,res)=>{
    try{
        const query = req.query.sort 
        if(query==="1"){
            const flats = await Flat.find().sort({flatno:1}).populate("residents").lean().exec()
            res.send(flats)
        }
        else if(query==="2"){
            const flats = await Flat.find().sort({flatno:-1}).populate("residents").lean().exec()
            res.send(flats)
        }
        else{
            const flats = await Flat.find().populate("residents").lean().exec()
            res.send(flats)
        }
    }catch(err){
        res.status(500).send(err.message)
    }
})
router.get("/filter",async(req,res)=>{
    try{
        const query = req.query.filter
        console.log("hello",query)
        const flat = await Flat.find({"flatblock":query}).populate("residents").lean().exec()
        res.send(flat)
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports = router