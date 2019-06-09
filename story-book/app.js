const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res, next) => {
    res.send('It works');
});

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
});