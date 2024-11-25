const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const adminauthMiddleware = async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication" });
  
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
        if (err) return res.status(400).json({ msg: "Invalid Authentication" });
  
        const user = await User.findById(decodedToken.id);
        if (!user) return res.status(400).json({ msg: "User not found" });
  
        // Check if the user is an admin
        if (user.role !== 'admin') {
          return res.status(403).json({ msg: "Unauthorized access" });
        }
  
        // Attach the user object to the request
        req.user = user;
        next();
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };

module.exports = adminauthMiddleware ;
