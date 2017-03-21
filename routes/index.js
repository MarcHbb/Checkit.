const express = require('express'),
      router  = express.Router();

var Event = require('../models/Events');


// Get Homepage
router.get('/', (req, res) => {

  Event.getEvent(function() {
      if(err) throw err;
      console.log(events);
    res.render('index');
  });
});

module.exports = router;
