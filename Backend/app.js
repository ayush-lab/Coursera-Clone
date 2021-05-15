const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketio = require('socket.io');
require('dotenv').config()

const authRoutes = require('./routes/auth');
const teacherRoutes=require('./routes/teacher')
const homeRoutes= require('./routes/homepage')
const courseRoutes=require('./routes/coursepage')
const stripeRoute=require('./routes/stripe')

const {addUser,getUser} = require('./chat');

const MONGODB_URI =
  'mongodb+srv://chadness:chadness@cluster0.ogixy.mongodb.net/Coursera?';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connect',(socket)=>{
  
  // console.log(socket.id)

  socket.on('join',({UserName,room},callback)=>{
    console.log(UserName,room);
    const {user,error} = addUser({id:socket.id,UserName,room});

    if(error){
      callback(error);
    }
    socket.join(user.room);
    socket.emit('Received_message',{user:'admin',text:"welcome"});
    socket.broadcast.to(user.room).emit('Received_message', { user: 'admin', text: `${user.userName} has joined!` });

  })

  socket.on('sendMessage',({message})=>{
    const user = getUser(socket.id);
    console.log(user)
    console.log(`message sent by ${user.userName} is::`,message);

    io.to(user.room).emit('Received_message', { user: user.userName, text: message });
  })

  socket.on('disconnect',()=>{
    console.log('disconnected')
  })
})



app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use('/videos',express.static(path.join(__dirname, 'videos')));
app.use('/Files',express.static(path.join(__dirname,'Files')));

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
app.use(stripeRoute);

mongoose
  .connect(MONGODB_URI,{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(result => {
        server.listen(8080);
        console.log("Server Started!")
    })
  .catch(err => {
    console.log(err);
  });