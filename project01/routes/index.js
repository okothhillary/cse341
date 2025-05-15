const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('May Node be with you!');
});

router.use('/contacts', require('./contacts'));

module.exports = router;
