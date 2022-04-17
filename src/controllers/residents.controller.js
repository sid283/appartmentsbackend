const express = require('express');
const Resident = require("../models/residents.model")
const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const resident = await Resident.create(req.body)
        res.send(resident)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.get("",async(req,res)=>{
    try{
        const residents = await Resident.find()
        res.send(residents)
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports = router