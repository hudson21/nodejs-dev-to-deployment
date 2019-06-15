const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), authController.getDashboard);

router.get('/verify', authController.getVerify);

router.get('/logout', authController.getLogout);

module.exports = router;