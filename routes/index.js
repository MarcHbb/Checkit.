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

router.post('/training', (req, res) => {
  var address = req.body.address,
      name    = req.body.name,
      img     = req.body.img,
      newSpot = new TrainingSpots({addresse: address, name: name, img: img});

      TrainingSpots.createSpot(newSpot, () => {
        res.redirect('/training');
      });
});

module.exports = router;
