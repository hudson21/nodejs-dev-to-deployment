const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Passport Config
require('./config/passport')(passport);

//Load Routes
const authRoutes = require('./routes/auth');

//Load Keys 
const keys = require('./config/keys');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose Connect 
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const app = express();

app.get('/', (req, res, next) => {
    res.send('It works');
});

//Use Routes
app.use('/auth', authRoutes);

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
});