const jwt = require('jsonwebtoken');

module.exports= (req,res,next)=>{

   let access_token = req.headers['authorization'];
   //console.log(access_token)

   if(!access_token){
      const error = new Error("not authenticated")
      error.statusCode=401;
      throw error
   }

   else{
      let access = access_token.split(' ')[1];
      let payload;

      try{
         payload = jwt.verify(access,process.env.ACCESS_TOKEN_SECRET);
      }
      catch(err){
         err.statusCode = 500;
         throw err;
      }

      if(!payload){
        const error = new Error("Not authenticated.");
        res.status(401).json({messages:"not authenticated"})
        error.statusCode = 401;
        throw error;
      }
      //console.log("this is the payload of access token",payload)
      res.userID=payload['username']
      next();
      

   //    let referesh_token = access_token.split(' ')[2];
   //   // console.log(referesh_token)
   //    console.log("paload = ",payload)
   //    let email = payload["email"]
   //    //sconsole.log(referesh_token);

   //    try
   //       {jwt.verify(referesh_token,process.env.REFRESH_TOKEN_SECRET);}
      
   //       catch(e){
   //          console.log("refersh token expired")
   //          return res.status(401).json({message:"Unauthorised"})
   //       }
      
   //       let New_access_token=jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRET,{
   //          algorithm: "HS256",
   //          expiresIn:process.env.ACCESS_TOKEN_LIFE
   //      });

   //      res.status(202).json({access_token:New_access_token})

  
   }
   
}