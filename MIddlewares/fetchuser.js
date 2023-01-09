const jwt = require('jsonwebtoken');

const fetchuser = (req,res,next) => {
  try {
    const token = req.header('authToken');
    if(!token) {
      return res.status(404).json({
        message:'Failed to authenticate the token, try again later...'
      });
    }
    
    // verify the jwt token
    const data = jwt.verify(token,process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res.status(500).json({
      message:'Failed to Authenticate the Token, try again later...',
      error:error.message
    });
  }
};

module.exports = fetchuser;