var express = require('express');
var router = express.Router();
var personService = require('../services/person-service')

router.get('/', function(req, res) {

    personService.findAll(function(err, result) {
        if (err) throw err;
        res.send(result);
    });

});

module.exports = router;