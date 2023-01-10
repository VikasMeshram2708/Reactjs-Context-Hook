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
    const user = await req.user._id;

    // validate the body
    const validMsg  = await Schema.validateAsync(req.body);
    const {title, answer} = req.body;
    if(validMsg) {
      // insert to Db
      const createdOn = new Date().toLocaleString();
      const created = await Message.insert({
        title,
        answer,
        createdOn,
        user
      });
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
    
    const item = await Message.find({
      user:req.user._id
    });
    if(!item) {
      return res.status(404).json({
        message:'Not Found...'
      });
    }
    return res.status(201).json({
      message:item.reverse()
    });
  } catch (error) {
    return res.status(500).json({
      message:'Some Internal Server Error',
      error:error.message
    });
  }
});

// Update The Created Message
router.put('/updateMyMessage/:id',fetchuser, async (req, res) => {
  try {

    const { id } = req.params;

    const value = await Schema.validateAsync(req.body);
    
    const item = await Message.findOne({
      _id:id,
    });

    if(!item) {
      return  res.status(422).json({
        message:'Not Found...'
      });
    }
    // validate the body

    await Message.update(
      {
        _id:id
      },
      {
        $set:value
      }
    );
    return res.status(201).json({
      message:'Message Was Successfully Updated!'
    });
  } catch (error) {
    return res.status(500).json({
      message:'Some Internal Server Error',
      error:error.message
    });
  }
});

// Delete the Created Messages
router.delete('/deleteMyMessage/:id',fetchuser, async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Message.findOne({
      _id:id,
    });

    if(!item) {
      return res.status(422).json({
        messag:'Not Found...'
      });
    }

    await Message.remove({
      _id:id
    });

    return res.status(201).json({
      message:'Success'
    });
  } catch (error) {
    return res.status(500).json({
      message:'Some Internal Server Error',
      error:error.message
    });
  }
});

module.exports = router;