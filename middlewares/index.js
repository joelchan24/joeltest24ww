const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const {clearRes} = require('../utils/utils')

// verify login
exports.verifyToken = (req, res, next) => {
  const { headload, signature } = req.cookies;

  try {
    if (!headload || !signature) {
      return res.status(401).json({ errorMessage: "not authorized" });
    }
    jwt.verify(`${headload}.${signature}`,process.env.SECRET, async (error, decoded) => {
        if (error) {
          return res.status(401).json({ errorMessage: "not authorized"});
        }
        const user = await User.findById(decoded.userId);
          req.user = clearRes(user.toObject())
        next()
      }
    );
  } catch (error) {
    res.status(401).json({errorMessage:"access denied"})
  }
};

// verify role
exports.checkRole = (arrayRoles) => {
  return (req, res, next) => {
    const {role} = req.user

    if(arrayRoles.includes(role)){
      next()
    } else {
      res.status(401).json({errorMessage:"you do not have permissions to perform this action"})
    }
  }
}