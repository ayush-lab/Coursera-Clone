const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const {OAuth2Client} = require('google-auth-library')


const client = new OAuth2Client(process.env.OAuth2Client);


exports.googleLogin = (req,res,next)=>{
    
    const {tokenId} = req.body;
    
    //console.log(process.env.OAuth2Client)
    client.verifyIdToken({idToken:tokenId,audience:process.env.OAuth2Client})
    .then(response =>{
        const {email,email_verified,name} = response.payload;
        console.log(response.payload);
        if(!email_verified){
            const error = new Error("Login failed, user not verified");
            error.statusCode = 403;
            res.status(403).json({message:"not verified"})
            throw error;
        }
        else if(email_verified){
            User.findOne({email:email})
            .then(user=>{

                if(!user){
                    // new user 
                    bcrypt.hash(Math.random(100),12)
                        .then(hashedPassword=>{
                            const Newuser = new User(
                                {email:email,
                                password:hashedPassword,
                                isverified:true,
                                name:name,
                                resetVerified:false,
                                });
                            Newuser.save()
                            .then(result=>{
                                const access_token = jwt.sign({email:email}, process.env.ACCESS_TOKEN_SECRET,{
                                    algorithm: "HS256",
                                    expiresIn:process.env.ACCESS_TOKEN_LIFE})
                
                                    const referesh_token = jwt.sign({email:email}, process.env.REFRESH_TOKEN_SECRET,{
                                        algorithm: "HS256",
                                        expiresIn:process.env.REFRESH_TOKEN_LIFE})
                
                                    res.status(201).json({message:"User signed up and logged in!",access_token:access_token,referesh_token:referesh_token,username:user.name,userId:user._id})
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                }) 
              }

               else {
                    const access_token = jwt.sign({email:email}, process.env.ACCESS_TOKEN_SECRET,{
                    algorithm: "HS256",
                    expiresIn:process.env.ACCESS_TOKEN_LIFE})

                    const referesh_token = jwt.sign({email:email}, process.env.REFRESH_TOKEN_SECRET,{
                        algorithm: "HS256",
                        expiresIn:process.env.REFRESH_TOKEN_LIFE})

                    res.status(201).json({message:"User logged in!",access_token:access_token,referesh_token:referesh_token,username:user.name,userId:user._id})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })

}