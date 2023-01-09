const { Router } = require('express');

const router = Router();

// require the user schmea file from Models folder
const Schema = require('../Models/Auth');

// require the db connection
const db = require('../db');

// Db's collection Name
const User = db.get('users');

// require bcryptjs for hashing the password
const bcrypt = require('bcryptjs');

// Require jwt for storingi the tokens
const jwt = require('jsonwebtoken');

// Route 1 : Create a new User Using POST "/api/auth/createUser"
router.post('/createUser', async (req, res) => {
  try {
    // validate the user scnema
    const user = await Schema.validateAsync(req.body); // everything is insdie the req.body
    
    if(user) {
      // check if the email is already in use.
      const isExist = await User.findOne({
        email:req.body.email
      });

      if(isExist) {
        // if yes throw error
        return res.status(403).json({
          message:'Hey, Email is already in use...'
        });
      }


      // HASH the password
      const secPass = await bcrypt.hash(req.body.password, 10);
      user.password = secPass;

      // keep track when the User was created
      user.createdOn = new Date().toLocaleString();
      //   Insert to DB
      await User.insert(user);

      return res.status(201).json({
        message:'User Registerd Successfully!',
      });
      // insert to db
    }
    return res.status(422).json({
      message:'Try to register with valid credentails!'
    });
  } catch (error) {
    return res.status(500).json({
      message:'Some Internal Server Error',
      error:error.message
    });
  }
});

// Route 2 : User Login Using POST "/api/auth/userLogin"
router.post('/userLogin', async (req, res) => {
  try {
    // Check if the use exist
    const user = await User.findOne({
      email:req.body.email,
    });

    if(user) {
      // compare the password
      const isValidKey = await bcrypt.compare(req.body.password, user.password);
      
      if(isValidKey) {

        // sign with jwt token
        const data = {
          _id:user._id,
          name:user.name,
          email:user.email
        };

        const authToken = jwt.sign(data, process.env.JWT_SECRET);
      
        return res.status(201).json({
          message:'User Logged In Successfully!',
          token:authToken
        });
      }
    }
    return res.status(201).json({
      message:'Try, to login with valid credentails!'
    });
  } catch (error) {
    return res.status(500).json({
      message:'Some Internal Server Error',
      error:error.message
    });
  }
});










module.exports =  router;