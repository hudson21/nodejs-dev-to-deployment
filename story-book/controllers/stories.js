const Story = require('../models/story');
const User = require('../models/user');

exports.getStories = (req, res, next) => {
    Story.find({status: 'public'})
        .populate('user')
        .then(stories => {
            res.render('stories/index', {
                stories
            });
        });
};

exports.getAddStories = (req, res, next) => {
    res.render('stories/add');
};

exports.postAddStory = (req, res, next) => {
    let allowComments;

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments,
        user: req.user.id 
    };

    //Create Story
    new Story(newStory).save().then(story => {
        res.redirect(`/stories/show/${story._id}`);
    });
};

exports.getSingleStory = (req, res, next) => {
    Story.findById(req.params.id)
    .populate('user')
    .then(story => {
        res.render('stories/show', {
            story
        });
    });
};

exports.getEditStoryForm = (req, res, next) => {
    Story.findById(req.params.id)
    .then(story => {
        res.render('stories/edit', {
            story
        });
    }); 
};

exports.putEditStoryForm = (req, res, next) => {
    Story.findById(req.params.id)
    .then(story => {
        let allowComments;

        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }
        
        //New Values from the Form
        story.title = req.body.title;
        story.body = req.body.body;
        story.status = req.body.status;
        story.allowComments = allowComments;

        story.save().then(story => {
            res.redirect('/dashboard');
        })
    });    
};