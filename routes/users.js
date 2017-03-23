const express       = require('express'),
      flash         = require('express-flash'),
      router        = express.Router(),
      passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

// Register
router.get('/register', (req, res) => {
  res.render('register');
});

// Login
router.get('/login', (req, res) => {
  res.render('login', {msg: req.flash('success') });
  });

// Register User
router.post('/register', (req, res) => {
  var username = req.body.username,
      password = req.body.password,
      password2 = req.body.password2;

  // Validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
      res.render('register', { errors : errors });
  } else {
      var newUser = new User({
          username: username,
          password: password
      });

      User.getUserByUsername(newUser.username, (err, user) => {
          if(err) throw err;
          if(user) {
              res.render('register', { message : 'mabite'});
          } else {
              User.createUser(newUser, (err, user) => {
                  if(err) throw err;
              });

              req.flash('success', 'You are registered and can now login');
              res.redirect('/users/login');
          }
      });

  }

});

// Check info for login
passport.use(new LocalStrategy(
  (username, password, done) => {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false);
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false);
   		}
   	});
   });
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash:'Invalid username or password'}),
  (req, res) => {
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;
