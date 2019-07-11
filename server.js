const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile= require('./routes/api/profile');
const stories= require('./routes/api/stories');

const path= require('path');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

console.log(__dirname);

//Allowing static file hosting
app.use('/images', express.static(__dirname + '/public/uploads'));

// Connect to MongoDB
const options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}
mongoose.Promise = require('bluebird');
mongoose
    .connect(db, options)
    .then(() => console.log('MongoDB Connected... '))
    .catch(err => console.log(err));
// security middleware
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const session = require('cookie-session');
const cookieKey = require('./config/keys').cookieKey

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// app.use(cors()); // cors middleware for auth
app.use(helmet()); // header middleware
app.use(compression());

// var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
// app.use(session({
//   name: 'session',
//   keys: [cookieKey],
//   cookie: {
//     secure: true,
//     httpOnly: true,
//     expires: expiryDate
//   }
// }))

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/stories', stories);

if(process.env.NODE_ENV==='production'){
  //set static folder
  app.use(express.static('client/build'));
  app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));

  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));