const Idea = require('../models/idea');

exports.getIdeas = (req, res, next) => {
    Idea.find({user: req.user.id})
        .sort({date:'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas
            });
        });
};

exports.getAddIdea = (req, res, next) => {
    res.render('ideas/add');
};

exports.getEditIdea = (req, res, next) => {
    Idea.findById(req.params.id)
        .then(idea => {
            //Checking if the current user is allowed to edit the current idea
            if (idea.user.toString() !== req.user.id.toString()) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/ideas');
            } else {
                res.render('ideas/edit', {
                    idea
                });
            }
        });
};

exports.postIdea = (req, res, next) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({text: 'Please add a title'});
    }
    if (!req.body.details) {
        errors.push({text: 'Please add some details'});
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors,
            title: req.body.title,
            details: req.body.details
        })
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        };
        new Idea(newUser).save()
        .then(idea => {
            req.flash('success_msg', 'Video idea added.');
            res.redirect('/ideas');
        }); 
    }
};

exports.updateIdea = (req, res, next) => {
    Idea.findById(req.params.id)
        .then(idea => {
            // new values
            idea.title = req.body.title;
            idea.details = req.body.details;

            idea.save()
                .then(updatedIdea => {
                    req.flash('success_msg', 'Video idea updated.');
                    res.redirect('/ideas');
                });
        });
};

exports.deleteIdea = (req, res, next) => {
    Idea.findByIdAndRemove(req.params.id)
        .then(() => {
            req.flash('success_msg', 'Video idea removed.');
            res.redirect('/ideas');
        });
};