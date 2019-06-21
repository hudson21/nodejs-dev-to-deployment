const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/stories');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

//Stories Index
router.get('/', storiesController.getStories);

//Show Single Story
router.get('/show/:id', storiesController.getSingleStory);

//Add Story Form 
router.get('/add', ensureAuthenticated, storiesController.getAddStories);

//Edit Story Form 
router.get('/edit/:id', ensureAuthenticated, storiesController.getEditStoryForm);

//Process Add Story
router.post('/', storiesController.postAddStory);

//Edit Form Process 
router.put('/:id', storiesController.putEditStoryForm);

module.exports = router;