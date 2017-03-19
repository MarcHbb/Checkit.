const express = require('express'),
      flash   = require('express-flash'),
      router  = express.Router();

var Event = require('../models/Event')

router.get('/events', ensureAuthentificated ,(req, res) => {
  res.render('events', {msg: req.flash('success') });
});

function ensureAuthentificated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You must login to publish events');
    res.redirect('/users/login');
  }
}

router.post('/events', (req, res) => {
  var eventName  = req.body.eventName,
      category   = req.body.category;
      /*
      desc       = req.body.desc,
      versus     = res.body.versus,
      price      = res.body.price,
      moneyPrice = res.body.price,
      city        = res.body.city;
      */

    // Validation
    req.checkBody('eventName', 'Name of the event is required').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();
    /*
    req.checkBody('versus', 'Versus is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('moneyPrice', 'moneyPrice is required').notEmpty();
    req.checkBody('city', 'City is required').notEmpty();
    */

    var errors = req.validationErrors();

    if(errors){
      res.render('events', { errors : errors });
    } else {
      var newEvent = new Event({
        eventName: eventName,
        category: category
        /*
        desc: desc,
        versus: versus,
        price: price,
        moneyPrice: moneyPrice,
        city: city;
        */
      });
      Event.createEvent(newEvent, (err, event) => {
        if(err) throw err;
        console.log(event);
      });
      req.flash('success', 'Your event has been registered');
      res.redirect('/events');
    }

});

module.exports = router;
