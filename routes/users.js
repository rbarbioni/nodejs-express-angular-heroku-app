var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var data = {
      'name': 'Will Smith'
  }
  res.send(data);
});

module.exports = router;
