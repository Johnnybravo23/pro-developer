const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


//creating the routes
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

// initialize the variable 
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

// connect to mongodb throw mongoose
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// creating the port
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));