const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config()

const authRoutes = require('./routes/auth');
const teacherRoutes=require('./routes/teacher')
const homeRoutes= require('./routes/homepage')
const courseRoutes=require('./routes/coursepage')

const MONGODB_URI =
  'mongodb+srv://chadness:chadness@cluster0.ogixy.mongodb.net/Coursera?';

const app = express();

const fileStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images');
  },
  filename: (req,file,cb)=>{
    cb(null, new Date().toDateString() + '-' + file.originalname)
  }
})

const fileFilter=(req,file,cb)=>{
  if(file.mimetype ==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
    cb(null,true);
  }
  else {cb(null,false);
        console.log("wrong file type")}
}


app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))

app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));


app.use((req, res, next) =>{  // To remove CROS (cross-resource-origin-platform) problem 
  res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
  res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods 
  res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
  next();
})


app.use(authRoutes);
app.use(teacherRoutes);
app.use(homeRoutes);
app.use(courseRoutes);

mongoose
  .connect(MONGODB_URI,{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(result => {
        app.listen(8080);
        console.log("Server Started!")
    })
  .catch(err => {
    console.log(err);
  });