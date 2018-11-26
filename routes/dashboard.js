var express = require('express');
var router = express.Router();
var profileModel = require('../models/profile_db.js');
var userModel = require('../models/user_mgmt_db.js');



// router.get('/profile_student_view', function(req, res){
//     if(req.session.user && req.session.user.usertype == 'student'){
//         profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
//             if (err){
//                 res.json(err);
//             }else {
//                 res.render('profile_student_view', {
//                     title: 'view student profile',
//                     userdata: req.session.user,
//                 });
//             }
//         });
//     }else {
//         res.redirect('/login');
//     }
// });
router.get('/profile_student_view', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        userModel.userAccInfo({username:req.session.user.username}, function(err, data){
            if (err){
                profileModel.userAccInfo({username:req.session.user.username}, function(err, data){
                    console.log("No error");
                    var studentData = data;
                    console.log(data);
                    res.render('profile_student_view', {
                        title: 'View Student Profile',
                        userdata: req.session.user,
                        //maxpage: parseInt((data.length-1)/10)+1,
                        studentData:studentData
                    });
                });


            }else {
                res.json(err);
            }
        });
    }else {
        res.redirect('/login');
    }
});

module.exports = router;