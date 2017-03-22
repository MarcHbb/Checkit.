const express = require('express'),
      router  = express.Router();

var Event = require('../models/Event');


// Get Homepage
router.get('/', (req, res) => {

  Event.getEvents(function(evenement) {

    res.render('index', { list : evenement });
  });
});

module.exports = router;
