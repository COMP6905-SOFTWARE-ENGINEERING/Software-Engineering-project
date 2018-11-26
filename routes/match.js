var express = require('express');
var router = express.Router();
var projectModel = require('../models/project_db.js');


router.get('/result', function(req, res) {
    if (req.session.user){
        projectModel.findAll(function(err, data){
            if (err){
                res.json(err);
            }else {
                var projects = data;
                res.render('project_match', {
                    title: 'match result',
                    userdata: req.session.user,
                    status: 'ok',
                    data: projects,
                });
            }
        });
    }else {
        res.redirect('/login');
    }
});

module.exports = router;