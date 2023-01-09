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

      //   Insert to DB
      const created = await User.insert(user);

      return res.status(201).json({
        message:'User Registerd Successfully!',
        user:created
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


module.exports =  router;