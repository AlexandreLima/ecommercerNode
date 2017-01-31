var express = require('express');
var http = require('http');
var router = express.Router();
var staticStrings = require('app-modules');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/sku/:idItem', function(req, res, next) {

    var idItem = req.params.idItem;

    var url = '/v1/items/idItem?format=json&apiKey=key'
        .replace('idItem', idItem)
        .replace('key', staticStrings.apiKey());

    http.get({ host: staticStrings.hostApi(), path: url }, function(response) {
        var body = '';
        response.on('data', function(data) {
            body += data;
        });

        response.on('end', function() {
            res.json(body);
        });

    }).on('error', function(data) {
        console.log(data);
    });
});

module.exports = router;