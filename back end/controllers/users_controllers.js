const { Users_schema } = require("../models");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const {generateAccessToken} = require("../middleware/jwt_generate");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const {registrSchema, loginSchema} = require('../validation');



exports.register = async (req,res) => {
  console.log(Users_schema)
  
  try{
    const {error} = registrSchema.validate(req.body);
    if(error){
        return res.status(400).json({error: error.details[0].message});
    }
      const {role,userName,firstName,lastName,email,password} = req.body;
      const hashed_password = CryptoJS.SHA256(password).toString();
      const emailExists = await Users_schema.findOne({where: {email}});
          if(emailExists){
              return res.status(400).json({message: "Account with this email already exists"});
          }
      await Users_schema.create({userName,firstName,lastName,email,password:hashed_password})
      const token = generateAccessToken(role,email)
      // send_mail(email,token)
      res.status(201).json({message: "User created",token:token})
  }
  catch(err){
      res.status(500).json({error: err.message})
  }
}
exports.login= async (req,res) => {
    try{ 
        const {error} = loginSchema.validate(req.body);
        if(error){
            return res.status(400).json({error: error.details[0].message});
        }
    const {email,password} = req.body;
    const hashed_password = CryptoJS.SHA256(password).toString();
    const data = await Users_schema.findOne({where: {email:email}})
    if(data.email === email && data.password===hashed_password ){
        const token = generateAccessToken(data.role,email);
        res.status(200).json({message:"Logged in!",token:token})
      }
      }  
      catch(err){
          res.status(403).json({error: "Login credentials are incorrect!"})
      }
  }

exports.getAllUsers = async (req,res) => {
  try{
      const data = await Users_schema.findAll()
      res.status(200).json({message:"You are welcomed", data:data})
  }
  catch(err){
      res.status(500).json({message:"Not verified"})
  }
 }

exports.send_mail =(mail,token)=>{
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "anihakobyan.11@mail.ru",
      pass: PASS
    }
  })

  const mailOptions = {
    from: "anihakobyan.11@mail.ru",
    to: mail,
    subject: "Sending Email using Node.js",
    text:  sexmel `http://localhost:3001/verify/${token}`
  }

  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log(err);
    }else{
      console.log('Email sent :'  + info.response)
    }
  })

}

exports.verify = (req,res)=>{
  const token = req.params.token;
  const decoded = jwt.verify(token, SECRET);
  Users_schema.update({is_verified : 1}, {where : { email :decoded.email}})
   .then((user)=> {
      res.send("Email verified")
   })
   .catch((err)=>{
      res.status(500).send("Error verifying email")
   })
}

exports.updateUser = async (req,res) => {
  try{
      const {id} = req.params;
      const {role} = req.body;
      await Users_schema.update({role},{where:{id}})
      res.status(200).json({message:"User updated"}) 
  }
  catch(err){
      res.status(500).json({error: err.message}) 
  }
}

exports.deleteUser = async (req,res) => {
  try{
      const {id} = req.params;
      await Users_schema.destroy({where:{id}})
      res.status(204).json({message:"User deleted"}) 
  }
  catch(err){
      res.status(500).json({error: err.message}) 
  }
}