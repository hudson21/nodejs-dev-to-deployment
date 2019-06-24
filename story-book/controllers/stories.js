const Story = require('../models/story');
const User = require('../models/user');

exports.getStories = (req, res, next) => {
    Story.find({status: 'public'})
        .populate('user')
        .sort({date:'desc'})
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
    .populate('comments.commentUser')
    .then(story => {
        if (story.status == 'public') {
            res.render('stories/show', {
                story
            });
        } else {
            if (req.user) {
                if (req.user.id.toString() === story.user._id.toString()) {
                    res.render('stories/show', {
                        story
                    });
                } else {
                    res.redirect('/stories');
                }
            } else {
                res.redirect('/stories');
            }
        }
    });
};

exports.getEditStoryForm = (req, res, next) => {
    Story.findById(req.params.id)
    .then(story => {
        if (story.user.toString() !== req.user.id.toString()) {
            res.redirect('/stories');
        } else {
            res.render('stories/edit', {
                story
            });
        }
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

exports.deleteStory = (req, res, next) => {
    Story.remove({_id: req.params.id})
    .then(() => {
        res.redirect('/dashboard');
    });
};

exports.postAddComment = (req, res, next) => {
    Story.findOne({_id: req.params.id})
    .then(story => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        };

        //Add to Comments array
        story.comments.unshift(newComment); //It is going to add to the beginning
        story.save().then(story => {
            res.redirect(`/stories/show/${story.id}`);
        });
    });
};

exports.getStoriesByUser = (req, res, next) => {
    Story.find({user: req.params.userId, status: 'public'})
    .populate('user')
    .then(stories => {
        res.render('stories/index',{
            stories
        });
    });
};

exports.getMyStories = (req, res, next) => {
    Story.find({user: req.user.id})
    .populate('user')
    .then(stories => {
        res.render('stories/index',{
            stories
        });
    });
};