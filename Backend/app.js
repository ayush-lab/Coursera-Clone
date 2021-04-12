const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
//const session = require('express-session');
//const MongoDBStore = require('connect-mongodb-session')(session);

//const errorController = require('./controllers/error');
//const User = require('./models/user');

// authentication routes
const authRoutes = require('./routes/auth');
const isAuth= require('./middleware/is-auth');

const MONGODB_URI =
  'mongodb+srv://chadness:chadness@cluster0.ogixy.mongodb.net/Coursera?';

const app = express();

//const store = new MongoDBStore({
 // uri: MONGODB_URI,
 // collection: 'sessions'
//});

// app.set('view engine', 'ejs');
// app.set('views', 'views');

app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );
app.use((req, res, next) =>{  // To remove CROS (cross-resource-origin-platform) problem 
  res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
  res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods 
  res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
  next();
})


// app.use('/admin', adminRoutes);
// app.use(shopRoutes);


app.use(authRoutes);
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