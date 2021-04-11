const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const Otp = require('../model/otp');
const nodemailer=require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport');
const {validationResult} =require('express-validator/check')
const api_key = require('../config/config');

const transporter =nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:api_key.databaseKey
    }
}))


exports.signup = (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    const name=req.body.name;

    let otp =null;
    //let tokenGenerated=null;

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error('Validation failed')
        error.statusCode=422;
        error.data=errors.array();
        return res.status(422).json({
            data:error.data,
            message:"Invalid credentials"
        })

        throw error;
    }

    User.findOne({email:email})
    .then(user=>{
        if(user)
           {  
            const error = new Error("email already exits in the database");
            error.statusCode = 422;
            error.data = {
                value: email,
                message: "User exist with an email",
                param: "email",
                location: "login",
            }
           throw error;
           }

        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            const Newuser = new User(
                {email:email,
                password:hashedPassword,
                isverified:false,
                name:name,
                });
            Newuser.save();
            console.log("details saved in the database")
           
            // const token = jwt.sign({email:email}, process.env.ACCESS_TOKEN_SECRET,{
            //     algorithm: "HS256",
            //     expiresIn:process.env.ACCESS_TOKEN_LIFE
            // })
            // tokenGenerated=token;
            otp=Math.floor(Math.random()*100000);

            const OTP=new Otp({
                 otp:otp,
                //  token:token,
                 email:email
                })

            OTP.save();
        })
        .then(result=>{
            console.log(result)
        })
        .then(result=>{
            transporter.sendMail({
                to:email,
                from:"ayush.verma8750@gmail.com",
                subject:"OTP Verification",
                html:` '<h1>Please Verify your account using this OTP: !</h1>
                        <p>OTP:${otp}</p>'`
            })
            console.log("mail sent")
            res.status(201).json({ message: "OTP sent to your Email" })
        })
    })
   
    .catch(err=>{
        console.log(err);
    })

}

exports.otpVerification = (req,res,next)=>{
    const receivedOtp=req.body.otp;
   // const receivedToken=req.body.token;
    const email=req.body.email;
    // validation

    Otp.findOne({email:email})
    .then(user=>{
        if(!user){
            const error = new Error("Validation failed ,this otp does not exist"); // when token not found
            error.statusCode = 403;
            error.data = {
            value: receivedOtp,
            message: "Invalid email",
            param: "otp",
            location: "otpVerification",
            };
            throw error;
        }
        if(user.otp!=receivedOtp){
            const error = new Error("Validation Failed");
            error.statusCode = 401;
            res.status(401).json({ message: "wrong otp entered " });
            error.data = {
            value: recievedOtp,
            message: "Otp incorrect",
            param: "otp",
            location: "otp",
            };
            throw error;
        }
        else{
            //  correct OTP
            User.findOne({email:email})
            .then(user=>{
                user.isverified=true;  
                const token=jwt.sign({email:email,userId:user._id},process.env.ACCESS_TOKEN_SECRET,{
                    algorithm: "HS256",
                    expiresIn:process.env.ACCESS_TOKEN_LIFE
                });
                user.Token=token;
                user.save();

                return res.status(200).json({
                    message: "otp entered is correct, user successfully added",
                    token:token, 
                    userId:user._id.toString()
                  });

            })
        }
        
        
    })
    .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

}

exports.login = (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({email:email})
    .then(user=>{
        if(!user){
            const error = new Error("Validation Failed");
            error.statusCode = 401;
            res.status(401).json({ message: "User with this email doesn't exists" });
            error.data = {
            value: email,
            message: " user doesnt exist"}
            throw error;
        }
        if(user.isverified==false){
            console.log("user isn't verified")
         
            otp=Math.floor(Math.random()*100000);
             
            Otp.findOne({email:email})
            .then(user_data=>{
                user_data.otp=otp;
                user_data.save();
            })

            transporter.sendMail({
            to:email,
            from:"ayush.verma8750@gmail.com",
            subject:"OTP Verification",
            html:` '<h1>Please Verify your account using this OTP: !</h1>
                    <p>OTP:${otp}</p>'`
            })
            
            console.log("mail sent")
            res.status(201).json({ message: "OTP sent to your Email" , token:token})
            
            const error = new Error("Validation Failed");
            error.statusCode = 401;
            res.status(401).json({ message: "User with this email doesn't exists" });
            error.data = {
            value: email,
            message: " user doesnt exist"}
            throw error;
        }

        bcrypt
        .compare(password,user.password)
            .then(matchPass=>{

                if(matchPass){
                    const token = jwt.sign({email:email}, process.env.ACCESS_TOKEN_SECRET,{
                    algorithm: "HS256",
                    expiresIn:process.env.ACCESS_TOKEN_LIFE})
                
                    user.Token=token;
                    user.save()
                    res.status(201).json({message:"User logged in!"})
                    
                }
                else {
                    res.status(401).json({message:"password don't match"})
                }

            })

                
    })
    .catch(err=>{
        err=>{
            console.log(err);
            console.log("back to login page");
        }
    })
}

exports.resetPassword = (req,res,next)=>{

    const email = req.body.email;
    let otp=Math.floor(Math.random()*100000);
        Otp.findOne({email:email})
        .then(user=>{
            if(!user){
                console.log("email doesnt exists")
                console.log("erorr")
                return res.redirect('/')
            }
            user.otp=otp;
            return user.save();
        })
        .then(result=>{
            transporter.sendMail({
                to:email,
                from:"ayush.verma8750@gmail.com",
                subject:"Reset Password for shelp",
                html:` '<h1>this is your otp to reset your password: ${otp}</h1>'`
            })
            console.log("mail sent  ",otp)
            
        })  
        .catch(err=>{
            console.log(err)
        })
}


exports.resetOtpVerification = (req,res,next)=>{
    const email=req.body.email;
    const otp=req.body.otp;

    Otp.findOne({email:email})
    .then(user=>{
        if(!user){
            const error = new Error("Validation Failed");
            error.statusCode = 401;
            res.status(401).json({ message: "Otp is incorrect" });
            error.data = {
            value: email,
            message: " otp is incorrect"}
            throw error;
        }
         if(user.otp==otp){
            res.status(201).json({ message: "Email verified successfully", email:email})}   
    })
    .catch(err=>{
        err=>{
            console.log(err);
            console.log("back to login page");
        }
    })
}




exports.newPassword = (req,res,next)=>{
    const email=req.body.email;
    const newPassword = req.body.password;
    const confirmPassword=req.body.confirmPassword;
    let resetUser;

    User.findOne({email:email})
    .then(user=>{

        if(!user){
            const error = new Error("user with this email doesnt exists");
            error.statusCode = 401;
            res.status(401).json({ message: "user with this email doesnt exists" });
            error.data = {
            value: email,
            message: "user with this email doesnt exists"}
            throw error;
        }
        resetUser=user;
        return bcrypt.hash(newPassword,12);
     })
        .then(hashedPassword=>{
               resetUser.password=hashedPassword;
               return resetUser.save();
            })

    .then(result=>{
        console.log("result",result)
        res.status(201).json({message:"password changed succesafully",password:resetUser.password});
    })
  
    .catch(err=>{
        console.log(err);
    })
    
}