const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/', ensureGuest, indexController.getWelcome);

router.get('/dashboard', ensureAuthenticated, indexController.getDashboard);

router.get('/about', indexController.getAbout);

module.exports = router;