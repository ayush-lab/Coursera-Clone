const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Security = new Schema({
    
   otp:{
       type:String,
       required:true
    },
    
    email:{
        type:String,
        required:true
    },
    
    createdAt: {type:Date,expires:'2m',default:Date.now},


});

module.exports = mongoose.model('Otp',Security);
