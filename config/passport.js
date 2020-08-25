const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const Example = require('../models/example')

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
},
    function (accessToken, refreshToken, profile, cb) {
        Example.findOne({ 'githubId': profile.id }, function (err, user) {
            if (err) return cb(err);
            if (user) {
                return cb(null, user);
            } else {
                const newExample = new Example({
                    name: profile.displayName,
                    githubId: profile.id
                });
                newExample.save(function (err) {
                    if (err) return cb(err);
                    return cb(null, newExample);
                });
            }
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Example.findById(id, function (err, user) {
        done(err, user);
    });
});