const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('users/login');
};

exports.getRegister = (req, res, next) => {
    res.render('users/register');
};

exports.postRegister = (req, res, next) => {
    let errors = [];

    if (req.body.password != req.body.password2) {
        errors.push({text: 'Passwords do not match'});
    }

    if (req.body.password.length < 4) {
        errors.push({text: 'Password must be at least 4 characters'});
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                req.flash('error_msg', 'Email already registered');
                res.redirect('/users/register');
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
        
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()       
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and you can login');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        });
    }
};

exports.postLogin = (req, res, next) => {
    passport.authenticate('local',{
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next); //Local is the strategy installed by passport-local
};

exports.getLogout = (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};