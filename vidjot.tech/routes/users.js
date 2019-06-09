const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

//User Login Route
router.get('/login', usersController.getLogin);

//User Register Route
router.get('/register', usersController.getRegister);

//Login Form POST
router.post('/login', usersController.postLogin);

//Register Form POST
router.post('/register', usersController.postRegister);

//Logout User
router.get('/logout', usersController.getLogout);


module.exports = router;