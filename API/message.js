const { Router } = require('express');

const router = Router();

// required the fetchuser middlewares
const fetchuser = require('../MIddlewares/fetchuser');

// require the messages schema 
const Schema = require('../Models/Messages');

// make db connection
const db = require('../db');

// collection name of db
const Message = db.get('messages');

// Create a new Message
router.post('/createMessage',fetchuser, async (req,res)=> {
  try {
    // validate the body
    const validMsg  = await Schema.validateAsync(req.body);

    if(validMsg) {
      // insert to Db
      validMsg.createdOn = new Date().toLocaleString();
      const created = await Message.insert(validMsg);
      return res.status(201).json({
        message:'Message Inserted Successfully!',
        data:created,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message:'Some Internal Server Error',
      error:error.message
    });
  }
});

// Read a Created Message
router.get('/getMyMessages',fetchuser, async (req, res) => {
  try {

    const item = await Message.find();
    if(!item) {
      return res.status(404).json({
        message:'Not Found...'
      });
    }
    return res.status(201).json({
      message:item
    });
  } catch (error) {
    return res.status(500).json({
      message:'Some Internal Server Error',
      error:error.message
    });
  }
});

module.exports = router;