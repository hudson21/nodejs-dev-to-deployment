
exports.getDashboard = (req, res, next) => {
    res.redirect('/dashboard');
};

exports.getVerify = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
    } else {
        console.log('Not Auth');
    }
};

exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};