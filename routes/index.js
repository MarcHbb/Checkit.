const express = require('express'),
      router  = express.Router();

var Event = require('../models/Events');


// Get Homepage
router.get('/', (req, res) => {

  Event.getEvent(function(evenement) {
      if(err) throw err;
      console.log(evenement);
    res.render('index');
  });
});

module.exports = router;
