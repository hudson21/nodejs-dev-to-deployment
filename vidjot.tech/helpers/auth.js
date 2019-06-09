module.exports = {
    ensureAuthenticated: (req, res, next) => {
        //req.isAuthenticated --> passport functionality
        if (req.isAuthenticated()) {    
            return next();
        }
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/users/login');
    }
};