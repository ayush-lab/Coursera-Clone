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
    let tokenGenerated=null;
    console.log(name)

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error('Validation failed')
        error.statusCode=422;
        error.data=errors.array();
        console.log(error,error[0])
        res.status(422).json({message:errors.array()})
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
           
            const token = jwt.sign({email:email}, process.env.ACCESS_TOKEN_SECRET,{
                algorithm: "HS256",
                expiresIn:process.env.ACCESS_TOKEN_LIFE
            })
            tokenGenerated=token;
            otp=Math.floor(Math.random()*1000000);

            const OTP=new Otp({
                 otp:otp,
                 token:token,
                 email:email
                })

            OTP.save();
            console.log(otp)
            res.status(201).json({ message: "OTP sent to your Email" ,token:tokenGenerated});
        })
            transporter.sendMail({
                to:email,
                from:"ayush.verma8750@gmail.com",
                subject:"OTP Verification",
                html:` '<h1>Please Verify your account using this OTP: !</h1>
                        <p>OTP:${otp}</p>'`
            })
            console.log("mail sent")
            
}

exports.otpVerification = (req,res,next)=>{
    const receivedOtp=req.body.otp;
    const receivedToken=req.body.token;
    const email=req.body.email;

    // validation
    console.log(receivedOtp,email,receivedToken);

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
            res.status(422).json({message:errors.array()})

            throw error;
        }


        if(user.otp!=receivedOtp){
            const error = new Error("Wrong Otp entered");
            error.statusCode = 401;
            res.status(401).json({ message: "wrong otp entered " });
            error.data = {
            value: receivedOtp,
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


exports.resendOtp = (req,res,next)=>{
    const email=req.body.email;
    const received_otp=req.body.otp;
    let otp =null;
    //let tokenGenerated=null;

    Otp.findOne({email:email})
    .then(user=>{
        if(!user){
            const error = new Error("Email doesnt exist"); // when token not found
            error.statusCode = 403;
            error.data = {
            value: received_otp,
            message: "Invalid email",
            param: "otp",
            location: "otpVerification",
            };
            throw error;
        }
        otp=Math.floor(Math.random()*1000000);

            user.otp=otp;
            user.save();
            console.log(otp);
            res.status(201).json({ message: "OTP sent to your Email" });
    })
    .then( ()=>{
        transporter.sendMail({
            to:email,
            from:"ayush.verma8750@gmail.com",
            subject:"OTP Verification",
            html:` '<h1>Please Verify your account using this OTP: !</h1>
                    <p>OTP:${otp}</p>'`
        })
        console.log("mail sent")
    })   

    .catch(err=>{
        err=>{
            if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
        }
    })
}





exports.login = (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error('Validation failed')
        error.statusCode=422;
        error.data=errors.array();
        console.log(error,error[0])
        res.status(422).json({message:errors.array()})
        throw error;
    }

    User.findOne({email:email})
    .then(user=>{
        if(!user){
            const error = new Error("Validation Failed");
            error.statusCode = 401;
            res.status(401).json({ message: "User with this email doesn't exist" });
            error.data = {
                value: email,
                message: " user doesnt exist"}

            throw error;
        }
        if(user.isverified==false){
            console.log("user isn't verified")
         
            otp=Math.floor(Math.random()*100000);
            console.log("otp =",otp)
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
             res.status(422).json({
                message: " you have not verified your otp, new otp has been sent to your email THANK YOU!"
              });
              const error = new Error("Login failed, user not verified");
              error.statusCode = 403;
              error.data = {
                message: "otp sent please verify yourself",
                location: "login",
                id: otp._id,
              };
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
                    res.status(201).json({message:"User logged in!",token:token})
                    
                }
                else {
                    res.status(401).json({message:"password don't match"})
                }

            })

                
    })
    .catch(err=>{
        err=>{
            if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
        }
    })
}

exports.resetPassword = (req,res,next)=>{

    const email = req.body.email;
    console.log(email);
    let otp=Math.floor(Math.random()*1000000);

    User.findOne({email:email})
        .then(user=>{
        if(!user){
            const error = new Error("Validation Failed");
            error.statusCode = 401;
            res.status(401).json({ message: "user doesnt exists" });
            error.data = {
            value: email,
            message: " otp is incorrect"}
            res.status(422).json({message: " User doesn't exists" });
            throw error;
        }
        else{
            const new_otp = new Otp({
                otp:otp,
                email:email
            })
             new_otp.save()
        }
    })
       
        .then(result=>{
            transporter.sendMail({
                to:email,
                from:"ayush.verma8750@gmail.com",
                subject:"Reset Password for shelp",
                html:` '<h1>this is your otp to reset your password: ${otp}</h1>'`
            })
            console.log("mail sent  ",otp)
            res.status(201).json({message:"otp sent to reset password"})
            
        })  
        .catch(err=>{
            if (!err.statusCode) {
                err.statusCode = 500;
              }
            next(err);
        })
}


exports.resetOtpVerification = (req,res,next)=>{
    const email=req.body.email;
    const otp=req.body.otp;
    console.log("reset::",otp);

    Otp.findOne({email:email})
    .then(user=>{
        if(!user){
            const error = new Error("Validation Failed");
            error.statusCode = 401;
            res.status(401).json({ message: "Otp is incorrect" });
            error.data = {
            value: email,
            message: " otp is incorrect"}
            res.status(422).json({message: " otp is incorrect or otp expired!" });
            throw error;
        }
       
         if(user.otp==otp){
            User.findOne({email:email})
            .then(matched=>{
                matched.isverified=true;
            }) 
            res.status(201).json({ message: "Email verified successfully", email:email})
        }
        else res.status(402).json({ message: "Wrong Otp entered", email:email})   
    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
        next(err);
    })
}




exports.newPassword = (req,res,next)=>{
    const email=req.body.email;
    const newPassword = req.body.newPassword;
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
            res.status(422).json({
                message: " User doesn't exists"
              });
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
        res.status(201).json({message:"password changed successfully"});
    })
  
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
        next(err);
    })
    
}