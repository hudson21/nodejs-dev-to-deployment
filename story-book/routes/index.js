const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('It works');
});

router.get('/dashboard', (req, res, next) => {
    res.send('dashboard');
});

module.exports = router;