const express = require('express'),
      router  = express.Router();

var Event = require('../models/Event');


// Get Homepage
router.get('/', (req, res) => {

  Event.getEvent(function(evenement) {
      console.log(evenement);
      res.render('index');
  });
});

module.exports = router;
