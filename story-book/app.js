const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Passport Config
require('./config/passport')(passport);

//Load Routes
const authRoutes = require('./routes/auth');

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