const Story = require('../models/story');
const User = require('../models/user');

exports.getStories = (req, res, next) => {
    res.render('stories/index');
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