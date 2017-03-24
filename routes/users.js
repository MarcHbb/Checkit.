const express       = require('express'),
      flash         = require('express-flash'),
      router        = express.Router(),
      passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');
var Event = require('../models/Event');


// Register
router.get('/register', (req, res) => {
  res.render('register');
});

// Login
router.get('/login', (req, res) => {
  res.render('login');
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
    var errUser;
    var errPassword;
    var errMatch;

    for(let i=0; i< errors.length; i++){
      if(errors[i].param == "username"){
        errUser = 'Username is required';
      } else if(errors[i].param == "password"){
        errPassword = 'Password is required';
      } else if(errors[i].param == "password2"){
        errMatch = 'Passwords do not match';
      }
    }

    res.render('register', { errUser : errUser, errPassword : errPassword, errMatch: errMatch });
  } else {
      var newUser = new User({
          username: username,
          password: password
      });

      User.getUserByUsername(newUser.username, (err, user) => {
          if(err) throw err;
          if(user) {
              res.render('register', { alrdyExist : 'Username already exist'});
          } else {
              User.createUser(newUser, (err, user) => {
                if(err) throw err;

                res.render('login' , { success : 'You have been registered, you can now log in'});
            });
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
  passport.authenticate('local'), (req, res) => {
    res.redirect('/');
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
