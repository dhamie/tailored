const Model = require('../models/user');

const mongoose= require('mongoose')
const db = mongoose.connection
const bcrypt = require("bcrypt");

exports.index = (req, res) => {
    res.send('User routed');
}


exports.createUser = async (req, res) => {    
    try {
        // Extract email and password from the req.body object
        const { userId, name, user_email, password, phone, detail } = req.body;          
        // Check if the email is already in use //rework 
        let userExists = await Model.findOne({ user_email });
         
        if (userExists) {
          res.status(401).json({ message: "Email is already in use." });
          return;
        }
         
        // Define salt rounds
        const saltRounds = 10;
                 
        // Hash password
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) throw new Error("Internal Server Error");       
          // Create a new user
          let newUser = new Model({
            userId,
            name,
            user_email,
            password: hash,
            phone,
            detail
          });       
          // Save user to database            
        db.db.collection('usertable').insertOne(newUser);
        console.log('added')
        res.send('added')
    })
    }catch(error){
        res.status(400).json({messaged: error.message})
    }    
}

exports.login = async (req, res) => {
      try {
        // Extract email and password from the req.body object
        const { user_email, password } = req.body;
     
        // Check if user exists in database
        let user = await Model.findOne({ user_email });
     
        if (!user) {
          return res.status(401).json({ message: "Invalid Credentials" });
        }
     
        // Compare passwords
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            return res.status(200).json({ message: "User Logged in Successfully" });
          }
          
          console.log(err);
          return res.status(401).json({ message: "Invalid Credentials" });
        });
      } catch (error) {
          res.status(400).json({messaged: error.message})
      }
}

