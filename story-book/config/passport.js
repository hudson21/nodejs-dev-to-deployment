const GoogleStrategy = require('passport-google-oauth20').Strategy;
const key = require('./keys');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: key.googleCLientID,
        clientSecret: key.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
    })
    )
}