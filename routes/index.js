const express = require('express'),
      router  = express.Router();

// Get Homepage
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/training', (req,res) => {
  res.render('training');
});

module.exports = router;
