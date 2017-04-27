var express = require('express');
var router = express.Router();
var personService = require('../services/person-service')
const error404 = {status: '404', message: 'Resource not found'};

router.get('/', function(req, res) {

    personService.findAll(req, res, function(err, result) {
        if (err) throw err;
        res.send(result);
    });

});

router.get('/:id', function(req, res) {

    personService.findById(req, res, function(err, result) {
        if (err) throw err;
        if(result.length > 0){
            res.send(result[0]);
        }
    });
});

router.delete('/:id', function(req, res) {
    personService.delete(req, res, function(err, result) {
        if (err) throw err;
        if(result.length == 0){
            res.status(404).json(error404)
        }else{
            res.status(204).send();
        }
    });
});

router.put('/:id', function(req, res) {
    personService.update(req, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.patch('/:id', function(req, res) {
    personService.updatePart(req, 
        function(err, result) {
            if (err) throw err;
            if(result.length == 0){
                res.status(404).json(error404)
            }else{
                res.status(204).send();
            }
        }
    );
});

router.post('/', function(req, res) {

    personService.create(req, function(err, result) {
        if (err) throw err;
        res.send(result);
    });

});


module.exports = router;