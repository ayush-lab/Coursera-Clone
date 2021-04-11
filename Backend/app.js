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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );


// app.use('/admin', adminRoutes);
// app.use(shopRoutes);


app.use(authRoutes);
//app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI,{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(result => {
        app.listen(3000);
        console.log("Server Started!")
    })
  .catch(err => {
    console.log(err);
  });