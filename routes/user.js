var express = require('express');
var crypto = require('crypto');
var url = require('url');
var router = express.Router();
var profileModel = require('../models/profile_db.js');
var educationModel = require('../models/education_db');
var experienceModel = require('../models/experience_db');
var userModel = require('../models/user_mgmt_db.js');
var countryModel = require('../models/country_db.js');
var areaModel = require('../models/area_db.js');
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

//Testing by :Mahesh
//method: get


router.get('/create_profile', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        areaModel.findAll(function (status, data) {
            var areas=[];
            if (status == 'ok'){
                for(var i in data){
                    areas.push(data[i].area);
                }
                res.render('profile_create', {
                    title:'Create Profile',
                    userdata: req.session.user,
                    areas: areas,
                });
            }else{
                res.json(status);
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
                var profileData = {
                    owner: req.body.user_id,
                    address: req.body.address,
                    country: req.body.country,
                    province: req.body.province,
                    city: req.body.city,
                    postal_code: req.body.postal_code,
                    skills: req.body.skills.split(','),
                    area_of_study: req.body.area_of_study,
                    level_of_study: req.body.level_of_study,
                    need_financial_aid: req.body.need_financial_aid,
                    research_interest: req.body.research_interest,
                    intended_start_date: req.body.intended_start_date,
                };
                //profileData['skills'] = req.body.skill.split(",");
                profileModel.createProfile(profileData, function(status){
                    if (status == 'ok'){
                        res.json({status:status, flag:1});
                    }else {
                        res.json({status:status, flag:0});
                    }
                });
                // var educationData = req.body;
                // educationModel.createEducation(educationData,function (status) {
                //     if (status == 'ok'){
                //         res.json({status:status, flag:1});
                //     }else {
                //         res.json({status:status, flag:0});
                //     }
                // });
                // var experienceData = req.body;
                // experienceModel.createExperience(experienceData,function (status) {
                //     if (status == 'ok'){
                //         res.json({status:status, flag:1});
                //     }else {
                //         res.json({status:status, flag:0});
                //     }
                // });
                // trigger match process
                // var projects = projectModel.findAll(function (status) {
                //     if (status == 'ok'){
                //         console.log('retrieve all documents in project collection successful')
                //     }else {
                //         console.log('retrieve all documents in project collection failed')
                //     }
                // })
                // var profiles = profileModel.findAll(function (status) {
                //     if (status == 'ok'){
                //         console.log('retrieve all documents in profile collection successful')
                //     }else {
                //         console.log('retrieve all documents in profile collection failed')
                //     }
                // })
                // matching(projects, profiles, 0.6)
            }
        });
    }else {
        res.json({status:"not login", flag:0});
    }
});

module.exports = router;