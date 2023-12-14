import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';

export const authenticate = async (req, res, next) => {
  try {
    console.log("start Token")
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.JWT_TOKEN, function (error, decode) {
        if (error) {
          res.json({ status:false,message:"Token is expired or invalid. Please try again." });
        } else {

          req.user = decode.id;
           console.log("check decode");
          console.log(decode.id);
          console.log("get token")
          next();
        }
      });
    } else {
      res.json({status:false,message:"No token provided.Access denied."});
    }
  } catch (error) {
    res.json({status:false,message:"Something went wrong."});
  }
};




export const adminRole = async (req, res, next) => {
  
  try {
    const user = await User.findById(req.user);
    console.log("admin role");
    console.log(user);
    if (user.isAdmin) {
      next();
    } else if(!user.isAdmin){
      console.log("your not admin to accesss the page..");
      res.json({status:false,message:"User cannot access it."});
    }
    else{
      res.json({status:false,message:"Admin can only access it. Please check it"});
    }
  } catch (error) {
    res.json({status:false, message: 'Something went Wrong' });
  }
 
  
};










