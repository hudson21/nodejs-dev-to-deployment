const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/stories');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

//Stories Index
router.get('/', storiesController.getStories);

//Add Story Form 
router.get('/add', ensureAuthenticated, storiesController.getAddStories);

//Process Add Story
router.post('/', storiesController.postAddStory);

module.exports = router;