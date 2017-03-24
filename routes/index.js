const express = require('express'),
      router  = express.Router();

var Event         = require('../models/Event'),
    TrainingSpots = require('../models/TrainingSpots');

// Get Homepage
router.get('/', (req, res) => {

  Event.getEvents(function(evenement) {

    res.render('index', { list : evenement });
  });
});

router.get('/training', (req, res) => {
  TrainingSpots.getSpots(function(result) {
    console.log(result);
    res.render('training', {list: result});
  });
});

module.exports = router;
