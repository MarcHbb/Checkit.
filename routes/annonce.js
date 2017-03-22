const express = require('express'),
      flash   = require('express-flash'),
      router  = express.Router();

var Event = require('../models/Event');

function ensureAuthentificated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You must login to publish events');
    res.redirect('/users/login');
  }
}

router.get('/' ,(req, res) => {
  Event.getEvents((evenement) => {

    res.render('annonce', { list : evenement });
  });
});
router.post('/', (req, res) => {
  var eventName  = req.body.eventName,
      category   = req.body.category,
      desc       = req.body.desc,
      versus     = req.body.versus,
      idUser;

    // Validation
    req.checkBody('eventName', 'Name of the event is required').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();
    req.checkBody('desc', 'Description is required').notEmpty();
    req.checkBody('versus', 'Versus is required').notEmpty();


    var errors = req.validationErrors();

    if(errors){
      res.render('annonce', { errors : errors });
    } else {
      var newEvent = new Event({
        eventName: eventName,
        category: category,
        desc: desc,
        versus: versus
      });
      Event.createEvent(newEvent, (err, event) => {
        if(err) throw err;
      });
      res.redirect('/annonce');
    }

});

router.get('/addAnnonce', (req,res) => {
  res.render('addAnnonce');
});

router.get('/editAnnonce', (req, res) => {
  Event.getEventById(req.query.event, (err, e_event) => {

    res.render('editAnnonce', {e_event : e_event});
  });
});



router.put('/editAnnonce', (req, res) => {
  Event.findOneAndUpdate({ _id:req.query.event},
    { $set: { eventName: req.body.eventName }},(err, newEvent) => {
    if(err) throw err;
    else {
    console.log(newEvent);
    }
  });
});


/* En cours ... fonctionne avec POSTMAN
router.delete('/:id', (req, res) => {
  Event.findOneAndRemove({ _id:req.params.id},(err, r_event) => {
    if(err) throw err;
    else {
    console.log(r_event);
    }
  });
});
 */
module.exports = router;
