const GoogleStrategy = require('passport-google-oauth20').Strategy;
const key = require('./keys');

const User = require('../models/user');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: key.googleCLientID,
        clientSecret: key.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, function(accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(profile);

        const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
        console.log(image);

        const newUser = {
            googleID: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            image 
        };

        //Check for existing user
        User.findOne({googleID: profile.id})
            .then(user => {
                if (user) {
                    //null: we dont have an error, return user
                    done(null, user);
                } else {
                    //Create User
                    new User(newUser).save()
                    .then(user => done(null, user));
                }
            })
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((user, done) => {
        User.findById(user.id).then(user => done(null, user));
    });
}