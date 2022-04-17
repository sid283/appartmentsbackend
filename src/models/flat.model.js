const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
    flattype:{type:String,required:true },
    flatno:{type:Number,required:true},
    flatblock:{type:String, required:true},
    residents:[{type:mongoose.Schema.Types.ObjectId, ref:"resident"}],
},{
    versionKey:false,
    timestamps:true
})

const Flat = mongoose.model("flat",flatSchema)
module.exports = Flat