const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
const ideasController = require('../controllers/ideas');

//Idea Index Page
router.get('/', ensureAuthenticated, ideasController.getIdeas);

//Add Idea Form
router.get('/add', ensureAuthenticated, ideasController.getAddIdea);

//Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, ideasController.getEditIdea);

// Process Form
router.post('/', ensureAuthenticated, ideasController.postIdea);

//Edit Form process
router.put('/:id',  ensureAuthenticated, ideasController.updateIdea);

//Delete Idea 
router.delete('/:id',  ensureAuthenticated, ideasController.deleteIdea);

module.exports = router;