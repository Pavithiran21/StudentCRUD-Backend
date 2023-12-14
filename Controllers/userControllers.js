import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);
import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import {  MailSend } from '../Utils/Email.js';


export const register =async(req,res)=>{
    try{
      
        const {username, email, password} = req.body;
        const  users = await User.findOne({"email":email});
        if(!users){
            const user = new User();
            user.username = username;
            user.password = await bcrypt.hash(password,salt);
            user.email = email;  
            user.activeToken = crypto.randomBytes(20).toString("hex");
            console.log(user.activeToken);
            user.activeExpires = Date.now() + 24 * 3600 * 1000;
            

            let ActiveLink =`${process.env.CLIENT_URL}/activate/${user.activeToken}`;


            await MailSend(
              user.email,
              "Thanks for Registering your Account. Please Activate and Verify your Account",
              `Please click the following link to activate your account: ${ActiveLink}`,
              `<p>Please click the following link to activate your account: <a href="${ActiveLink}">${ActiveLink}</a></p>`
            )
           
            user.save();
            console.log(user);
            res.json({status:true,message:"User Registered Successfuly.Please check the mail to activate your account!!!",data:user});    
        }
        else{
            res.json({status:false,message:"Already Registered"});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong.please check the user details"});
    }

}
 
export const activeAccount = async(req,res) =>{ 

    try{       
        let user = await User.findOne({"activeToken": req.params.activeToken,activeExpires:{$gt:Date.now()}, isVerified:false })
        console.log(user);
        if(user){
            user.isVerified = true;
            user.save();
            console.log(user);
            res.json({status:true,message:"Account Activated Successfully",data:user})
        }
        else{
            // res.json({ status: false, message: "Account Activation Link Expired. Please Activate New Link" });
            res.json({status:true,message:"Account Activated Successfully",data:user})
        }
       
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"});

    }
} 

export const login = async (req, res) => {
  
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email, isVerified: true });
  
      if (user) {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
  
        if (isPasswordMatched) {
          const token = JWT.sign(
            {
              id: user._id,
            },
            process.env.JWT_TOKEN,
            // { expiresIn: "2h" }
          );
  
          console.log(token);
          res.json({
            status: true,
            message: "User Logged in Successfully",
            data: user,
            user_token: token,
          });
          console.log(user);
        } else {
          res.json({ status: false, message: "Invalid email or password" });
        }
      } else {
        res.json({ status: false, message: "User not found" });
      }
    } catch (err) {
      console.log(err);
      res.json({ status: false, message: "Something went wrong" });
    }
  
  
};

export const  forgot = async(req,res)=>{
    try{
        
        const user = await User.findOne({email:req.body.email,isVerified:true});
        console.log(user);
 
        if(user){
            user.resetToken = crypto.randomBytes(20).toString("hex")
            user.resetExpires = Date.now() + 24 * 3600 * 1000;

        
            let resetlink = `${process.env.CLIENT_URL}/reset/${user.resetToken}`;

            
            await MailSend(
              user.email,
              'Password Recovery Mail',
              `Please click the following link to Reset Password: ${resetlink}`,
              `<p>Please click the following link to Reset Password: <a href="${resetlink}">${resetlink}</a></p>`

            )
            user.save();
            console.log(user);
            res.json({status:true,message:"User Password Reset Link sent Successfully",data:user});
 
        }
        else{
            res.json({status:false,message:"Password Reset Link Invalid or Expired"});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something went wrong"});
    }
    

}

export const reset =async(req,res)=>{
  try {
      const {password} = req.body;
      
      const user = await User.findOne({ resetToken:req.params.resetToken,resetExpires:{$gt:Date.now()}});
      if (user) {
          bcrypt.hash(password, salt, function (err, hash) {
              user.password = hash
              user.updatedAt = Date.now()
              user.save();
          });
          console.log(user);          
          res.json({ status: true, message: "User  Password Reseted Successfully",data:user});
      }
      else {
          res.json({ status: false, message: " User  Password Reset is  invalid Link or expired.Please try again"});
      }
  } 
  catch(err){
      console.log(err);
      res.json({status:false,message:"Something went wrong"});
  }

}









