const express = require('express'),
      router  = express.Router();

var Event = require('../models/Event');

// Get Homepage
router.get('/', (req, res) => {

  Event.getEvents(function(evenement) {

    res.render('index', { list : evenement });
  });
});


router.get('/training', (req,res) => {
  res.render('training');
});

module.exports = router;
