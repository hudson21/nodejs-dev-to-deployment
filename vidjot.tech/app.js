const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Load Routes
const ideasRoutes = require('./routes/ideas');
const usersRoutes = require('./routes/users');

//

//Passport Config
require('./config/passport')(passport);

//DB config
const db = require('./config/database');

const app = express();

//Map global promised - get rid of warning
mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect(db.mongoURI)
.then(()=> {
    console.log('MongoDB Connected');
})
.catch(e => console.log(e));


//How middleware works
/*app.use((req, res, next) => {
    //console.log(Date.now());
    req.name = "Carlos Hudson";
    next();
});*/

// Handlebars Middleware
app.engine('handlebars', exphbs({ 
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars'); 

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Method-Override Middleware
app.use(methodOverride('_method'));

// Express-session Middleware
app.use(session({
    secret: 'khdlfkjahslfjhsalkhdflkhdsj',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash Middleware
app.use(flash());

//Global Variables Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use('/users', usersRoutes);
app.use('/ideas', ideasRoutes);

// Index Route
app.get('/', (req, res, next) => {
    const title = 'Welcome';
    res.render('index', {
        title
    });
});

//About route
app.get('/about', (req, res, next) => {
    res.render('about');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});