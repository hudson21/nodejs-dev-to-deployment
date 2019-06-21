const Story = require('../models/story');

exports.getWelcome = (req, res, next) => {
    res.render('index/welcome');
}

exports.getDashboard = (req, res, next) => {
    Story.find({user: req.user.id})
    .then(stories => {
        res.render('index/dashboard', {
            stories
        });
    });
}

exports.getAbout = (req, res, next) => {
    res.render('index/about');
}