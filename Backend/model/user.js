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

    courses:[
        {
            type:Schema.Types.ObjectId,
            required:true,
            ref:"Courses",
        }
    ],

    preferences:[{type:String}],

    Bookmark:[
        {
            type:Schema.Types.ObjectId,
            required:false,
            ref:"Course",
        }]

    //Token:String,
    //resetToken:String,
    //resetTokenExpiration:Date,
    
});

module.exports = mongoose.model('User',userSchema);
