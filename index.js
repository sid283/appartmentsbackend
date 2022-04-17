const express = require('express');
require("dotenv").config();
const connect = require('./src/configs/db');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const flatcontroller = require('./src/controllers/flat.controller');
const residentcontroller = require('./src/controllers/residents.controller');
const {register,login} = require('./src/controllers/auth.controller');
app.use(express.json())
app.use(cors())
app.post("/login",login);
app.post("/register",register);
app.use("/flats",flatcontroller);
app.use("/residents",residentcontroller);

app.listen(process.env.PORT||3000,async()=>{
    try{
        await connect();
        console.log("connected to db");
    }catch(err){
        console.log(err);
    }
})