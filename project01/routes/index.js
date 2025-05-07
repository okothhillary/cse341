const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from routes!');
});

router.use('/contacts', require('./contacts'));

module.exports = router;
