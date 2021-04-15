module.exports= (req,res,next)=>{

   const access_token = req.get("Authorization")
   console.log(access_token);
}