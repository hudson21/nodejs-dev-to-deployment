const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


//Passport Config
require('./config/passport')(passport);

//Load Routes
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const storiesRoutes = require('./routes/stories');

//Load Keys 
const keys = require('./config/keys');

//Handlebars Helpers
const { 
    truncate,
    stripTags
} = require('./helpers/hbs');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose Connect 
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const app = express();

//BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handlebars Middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate,
        stripTags
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Use Routes
app.use('/auth', authRoutes);
app.use('/', indexRoutes);
app.use('/stories', storiesRoutes);

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
});