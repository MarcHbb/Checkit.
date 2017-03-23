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
router.get('/addAnnonce',  (req,res) => {
  res.render('addAnnonce');
});
router.get('/editAnnonce/:id',  (req, res) => {
  Event.getEventById(req.params.id, (err, e_event) => {
    res.render('editAnnonce', {e_event : e_event});
  });
});

router.post('/addAnnonce', (req, res) => {
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
      var errEventName;
      var errCategory;
      var errDesc;
      var errVersus;

      for(let i=0; i< errors.length; i++){
        if(errors[i].param == "eventName"){
          errEventName = 'Name of the event is required';
        } else if(errors[i].param == "category"){
          errCategory = 'Category is required';
        } else if(errors[i].param == "desc"){
          errDesc = 'Description is required';
        } else if(errors[i].param == "versus"){
          errVersus = 'Versus is required';
        }
      }

      res.render('addAnnonce', { errEventName : errEventName, errCategory : errCategory, errDesc: errDesc, errVersus: errVersus });

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
router.post('/edit', (req, res) => {
  Event.findOneAndUpdate({ _id:req.body.id},
    { $set: { eventName: req.body.eventName }},(err, newEvent) => {
    if(err) throw err;
    res.redirect('/annonce');
  });
});
router.post('/delete', (req, res) => {
  Event.findOneAndRemove({ _id:req.body.id},(err, r_event) => {
    if(err) throw err;
    res.redirect('/annonce');
  });
});

module.exports = router;
