var express = require('express');
var crypto = require('crypto');
var url = require('url');
var router = express.Router();
var profileModel = require('../models/profile_db.js');
var educationModel = require('../models/education_db');
var experienceModel = require('../models/experience_db');
var userModel = require('../models/user_mgmt_db.js');
var countryModel = require('../models/country_db.js');
var mongo = require('mongodb');
var assert = require('assert');
var dbURL = require('../config/default');


router.get('/profileview', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
            if (err){
                res.json(err);
            }else {
                res.render('profile_view', {
                    title: 'Manage profile',
                    userdata: req.session.user,
                    maxpage: parseInt((data.length-1)/10)+1,
                });
            }
        });
    }else {
        res.redirect('/login');
    }
});

router.get('/create_profile', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        userModel.userAccInfo({username:req.session.user.username}, function(err, data){
            if (err == 'ok'){
                var countries = [];
                countryModel.findAll(function (status, data) {
                    if (status == 'ok') {
                        countries = data
                    } else {
                        console.log('retrieve all documents in project collection failed')
                    }
                })
                var programs=[];
                res.render('profile_create', {
                    title:'Create Profile',
                    userdata: req.session.user,
                    countries: countries,
                    programs: programs,
                });
            }else {
                res.json(err);
            }
        });
    }else {
        res.redirect('/login');
    }
});

//Testing by mahesh

// router.post('/create_profile', function(req, res){
//  var studentData = new profileModel();
//     var studentEdu = new educationModel();
//     studentData['addressLine1']=req.body.addressLine1;
//     studentEdu['edProgramLevel']=req.body.edProgramLevel;
//     console.log("successfull");
//     res.redirect('/login');
// });

//
router.post('/create_profile', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
            if (err){
                res.redirect('/404');
            }else {
                var profileData = req.body;
                profileData['skills'] = req.body.skill.split(",");
                profileModel.createProfile(profileData, function(status){
                    if (status == 'ok'){
                        res.json({status:status, flag:1});
                    }else {
                        res.json({status:status, flag:0});
                    }
                });
                var educationData = req.body;
                educationModel.createEducation(educationData,function (status) {
                    if (status == 'ok'){
                        res.json({status:status, flag:1});
                    }else {
                        res.json({status:status, flag:0});
                    }
                });
                var experienceData = req.body;
                experienceModel.createExperience(experienceData,function (status) {
                    if (status == 'ok'){
                        res.json({status:status, flag:1});
                    }else {
                        res.json({status:status, flag:0});
                    }
                });
                // trigger match process
                var projects = projectModel.findAll(function (status) {
                    if (status == 'ok'){
                        console.log('retrieve all documents in project collection successful')
                    }else {
                        console.log('retrieve all documents in project collection failed')
                    }
                })
                var profiles = profileModel.findAll(function (status) {
                    if (status == 'ok'){
                        console.log('retrieve all documents in profile collection successful')
                    }else {
                        console.log('retrieve all documents in profile collection failed')
                    }
                })
                matching(projects, profiles, 0.6)
            }
        });
    }else {
        res.json({status:"not login", flag:0});
    }
});

module.exports = router;