const express           = require('express'),
      path              = require('path'),
      cookieParser      = require('cookie-parser'),
      bodyParser        = require('body-parser'),
      ejs               = require('ejs'),
      expressValidator  = require('express-validator'),
      flash             = require('express-flash'),
      session           = require('express-session'),
      passport          = require('passport'),
      bcrypt            = require('bcryptjs'),
      mongoose          = require('mongoose'),
      port              = process.env.PORT || '9800';
var   db;

mongoose.connect('mongodb://user:user@ds127300.mlab.com:27300/danceco', function(err) {
  if(err) return;
  db = mongoose.connection;
});


var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');


// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // Passport var
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/', events);


// Set Port
app.set('port', port);

app.listen(port, () => {
  console.log(`Server running on port :${port}`)
});
