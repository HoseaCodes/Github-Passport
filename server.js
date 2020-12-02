const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');


require('dotenv').config();

const app = express();

require('./config/database');
require('./config/passport');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'merge',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

const port = process.env.PORT || 3000;


app.listen(port, function () {
    console.log(`Listening on port Andre: ${port}`);
});
