const Manager = require('../models/manager.model');

require("dotenv").config();

const jwt = require('jsonwebtoken');

const newToken = (user)=>{
    return jwt.sign({user},"process.env.JWT_SECRET");
}

const register = async (req,res)=>{
    try{
        let user_data = await Manager.find({ email: req.body.email }).lean().exec();
    console.log(user_data);

    if (user_data.length !== 0) {
      return res
        .status(400)
        .send({ message: "account associated with this email already exist" });
    }

    user_data = await Manager.create(req.body);

    const token = newToken(user_data);

    res.send({ user_data, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const login = async (req,res) => {
  try {
    const user_data = await Manager.findOne({ email: req.body.email })
     

    if (!user_data) {
      return res
        .status(400)
        .send({ message: "please check your email or password" });
    }

    const match = user_data.checkPassword(req.body.password);

    if (!match) {

      return res
        .status(400)
        .send({ message: "please check your email or password" });
    }

    const token = newToken(user_data);

    res.send({user_data,token});
    }
    catch(err){
        res.status(500).json({
            message:"Error registering user",
            error:err
        })
    }
}

module.exports = {register,login};