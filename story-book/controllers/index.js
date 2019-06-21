exports.getWelcome = (req, res, next) => {
    res.render('index/welcome');
}

exports.getDashboard = (req, res, next) => {
    res.render('index/dashboard');
}

exports.getAbout = (req, res, next) => {
    res.render('index/about');
}