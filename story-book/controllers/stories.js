exports.getStories = (req, res, next) => {
    res.render('stories/index');
};

exports.getAddStories = (req, res, next) => {
    res.render('stories/add');
};