const path = require('path');
const http = require('http');
require('dotenv').config()

const redis = require('redis');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');


const socketio = require('socket.io');

const api_key =require('./config/config');

const authRoutes = require('./routes/auth');
const teacherRoutes=require('./routes/teacher')
const homeRoutes= require('./routes/homepage')
const courseRoutes=require('./routes/coursepage')
const stripeRoute=require('./routes/stripe')

// const {addRoom,getUser} = require('./chat');

const MONGODB_URI =api_key.mongo;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const client = redis.createClient({
  host: api_key.redisHost,
  port: api_key.redisPort,
  password: api_key.redisPassword
});

io.on('connect',(socket)=>{
  

  socket.on('join',({UserName,room},callback)=>{
    console.log(UserName,room);
    let alreadyUser=true;
    let users=[];

    if(client.EXISTS(room)){
      client.lrange(room,0,-1,function(err,result){
        if(err){
          callback(err);
        }
        else{
          console.log("lrange result join=",result);
          const History=[];
          if(result.length == 0){
            alreadyUser=false;
          }
          result.forEach(user=>{
              user= JSON.parse(user)
              History.push(user)
              if(!users.includes(user.UserName)){
                users.push(user.UserName);
              }
          })
          console.log(users)
          socket.emit('history',{History:History,users:users});
        }
    });
    } 
    else {
      client.hset( room, null, function(err,result){
        if(err)
        callback(err);
        else{
          console.log("setting redis hset::",result)
        }
      });
    }
    console.log(users)
    socket.join(room)   
    io.to(room).emit('admin',
       { users:users,
         UserName: 'admin', 
         newUser:false,
         Message:alreadyUser ? `Welcome Back to the class ${UserName}`:`Welcome to the class ${UserName}` });
    
         socket.broadcast.to(room).emit('admin', { users:users,UserName: `${UserName}`, newUser:alreadyUser,Message: `${UserName} has joined!` });
    callback()
  })

  socket.on('sendMessage',({UserName,room,message},callback)=>{
    
    const user = {"UserName":UserName,"Message":message}

    if(client.EXISTS(room)){
      client.rpush(room,JSON.stringify(user),function(err,result){
        if(err)
        callback(err)
        else{
          console.log("rpush::",result)
        }
  });

    } else{
      client.hset( room,JSON.stringify(user), function(err,result){
        if(err)
        callback(err)
        else{
          console.log("hset::",result)
        }
      });
   }
    client.lrange(room,0,-1,function(err,result){
      console.log("redis result=",result)
      if(err){
        console.log(err)
      }
    })
    console.log(`${room} message sent by ${UserName} is::`,message);
    io.to(room).emit('Received_message', { UserName: UserName, Message: message });
    callback()
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