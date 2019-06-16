const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

router.get('/', indexController.getWelcome);

router.get('/dashboard', indexController.getDashboard);

router.get('/about', indexController.getAbout);

module.exports = router;