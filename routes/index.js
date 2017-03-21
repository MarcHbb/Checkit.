const express = require('express'),
      router  = express.Router();

var Event = require('../models/Events');


// Get Homepage
router.get('/', (req, res) => {

  Event.getEvent(err, events) => {
      if(err) throw err;
      console.log(events);
    res.render('index');
  }
});

module.exports = router;
