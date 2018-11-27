var express = require('express');
var router = express.Router();
var profileModel = require('../models/profile_db.js');
var userModel = require('../models/user_mgmt_db.js');
var experienceModel = require('../models/experience_db');
var educationModel = require('../models/education_db');



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
                var personalData = {};
                userModel.userAccInfo({username:req.session.user.user_id}, function(err, data){
                    console.log("No error");
                    personalData = data;
                    console.log(data);
                });

                var studentData = {};
                profileModel.userAccInfo({username:req.session.user.username}, function(err, data){
                    console.log("No error");
                    studentData = data;
                    console.log(data);
                });

                var educationData={};
                 educationModel.listByOwner({user_id:req.session.user.user_id}, function(err, data){
                    console.log("EducationData");
                    educationData = data;
                    console.log(educationData);

                });
                var experienceData={};
                    experienceModel.listByOwner({user_id:req.session.user.user_id}, function(err, data){
                    experienceData = data;
                   console.log(experienceData);

                    res.render('profile_student_view', {
                        title: 'View Student Profile',
                        userdata: req.session.user,
                        //maxpage: parseInt((data.length-1)/10)+1,
                        personalData:personalData,
                        studentData:studentData,
                        educationData:educationData,
                        experienceData:experienceData
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