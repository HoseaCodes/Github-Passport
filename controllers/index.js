const Example = require('../models/example');

module.exports = {
    index,
}

function index(req, res) {
    Example.find({}, function (err, example) {
        res.render('index', {
            example,
            user: req.user
        });
    });
}
