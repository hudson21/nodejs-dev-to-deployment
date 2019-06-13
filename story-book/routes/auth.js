const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), authController.getDashboard);

module.exports = router;