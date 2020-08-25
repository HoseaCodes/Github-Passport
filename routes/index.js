const router = require('express').Router();
const passport = require('passport');
const indexCtrl = require('../controllers/index')


router.get('/', indexCtrl.index);

router.get('/auth/github', passport.authenticate(
    'github',
    { scope: ['user:email'] }
));

router.get('/auth/github/callback', passport.authenticate(
    'github',
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }
));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;