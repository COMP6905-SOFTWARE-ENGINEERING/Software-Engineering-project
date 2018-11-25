var express = require('express');
var router = express.Router();
var profileModel = require('../models/profile_db.js');


router.get('/profile_student_view', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
            if (err){
                res.json(err);
            }else {
                res.render('profile_student_view', {
                    title: 'view student profile',
                    userdata: req.session.user,
                });
            }
        });
    }else {
        res.redirect('/login');
    }
});

module.exports = router;