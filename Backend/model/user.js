const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name:{
        type:String,
        required:true,
    },
    
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
  
    isverified:{
        type:Boolean,
        required:true
    },
    resetVerified:{
        type:Boolean,
        required:true,
    },
    
    Token:String,
    resetToken:String,
    resetTokenExpiration:Date,
    // cart:{
    //     items:[
    //         {
    //             productId:{
    //                 type:Schema.Types.ObjectId,    
    //                 ref:'Product',
    //                 required:true
    //             },
    //             quantity:{type:Number,required:true}
    //         }
    //     ]
    // }
});

module.exports = mongoose.model('User',userSchema);
