var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var accMgmtModel = require('../models/account_db.js');

router.get('/', function(req, res, next) {
        res.render('getStartedPage', {
            title: 'Welcome to MUN GradRec'
        });
});

module.exports = router;