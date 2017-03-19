const express = require('express'),
      router  = express.Router();

// Get Homepage
router.get('/', (req, res) => {
  res.render('index');
});

/*function ensureAuthentificated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}*/

module.exports = router;
