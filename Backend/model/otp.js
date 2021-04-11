const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Security = new Schema({
    
   otp:{
       type:String,
       required:true
    },
    
   token:{
       type:String,
       required:true
    },
    email:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Otp',Security);
