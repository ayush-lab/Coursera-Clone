const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config()

const authRoutes = require('./routes/auth');
const teacherRoutes=require('./routes/teacher')

const isAuth= require('./middleware/is-auth');

const MONGODB_URI =
  'mongodb+srv://chadness:chadness@cluster0.ogixy.mongodb.net/Coursera?';

const app = express();


app.use(multer({dest:'images'}).single('image'))
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{  // To remove CROS (cross-resource-origin-platform) problem 
  res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
  res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods 
  res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
  next();
})


app.use(authRoutes);
app.use(teacherRoutes);
//app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI,{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(result => {
        app.listen(8080);
        console.log("Server Started!")
    })
  .catch(err => {
    console.log(err);
  });