const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/stories');

//Stories Index
router.get('/', storiesController.getStories);

//Add Story Form 
router.get('/add', storiesController.getAddStories);

module.exports = router;