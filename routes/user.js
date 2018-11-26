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


router.get('/dashboard', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
            if (err){
                res.json(err);
            }else {
                res.render('dashboard', {
                    title: 'Dashboard',
                    userdata: req.session.user,
                });
            }
        });
    }else {
        res.redirect('/login');
    }
});

router.get('/profileview', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
            if (err){
                var studentData = data;
                console.log(studentData);

                res.json(err);
            }else {
                res.render('profile_view', {
                    title: 'Manage profile',
                    userdata: req.session.user,
                    maxpage: parseInt((data.length-1)/10)+1,
                    studentData:studentData
                });
            }
        });
    }else {
        res.redirect('/login');
    }
});

//Testing by :Mahesh
//method: get


//

router.get('/create_profile', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        userModel.userAccInfo({username:req.session.user.username}, function(err, data){
            if (err){
                var countries = [];
                countryModel.findAll(function (status, data) {
                    countriesData = data;
                    countries = countriesData.map(function (countriesData) {
                        return countriesData['Country'];
                    });
                    console.log(countries);
                });

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
        var owner = req.body.user_id;
        var address = req.body.address;
        var country = req.body.country;
        var province = req.body.province;
        var city =req.body.city;
        var postal_code = req.body.postal_code;
        var skills = req.body.skills.split(',');
        var area_of_study = req.body.area_of_study;
        var level_of_study = req.body.level_of_study;
        var need_financial_aid = req.body.need_financial_aid;
        var research_interest = req.body.research_interest;
        var intended_start_date = req.body.intended_start_date;

        //EducationModel Data
        let institution = req.body.educations;
        var program = req.body.educations;
        var program_level = req.body.educations;

        profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
            // ProfileModel Data

            if (err){
                res.redirect('/404');
            }else {
                var profileData = {
                    owner: owner,
                    address: address,
                    country: country,
                    province: province,
                    city: city,
                    postal_code: postal_code,
                    skills: skills,
                    area_of_study: area_of_study,
                    level_of_study: level_of_study,
                    need_financial_aid: need_financial_aid,
                    research_interest: research_interest,
                    intended_start_date: intended_start_date,
                };
                //profileData['skills'] = req.body.skill.split(",");
                profileModel.createProfile(profileData, function(status){
                    if (status == 'ok'){
                        //res.json({status:status, flag:1});
                    }else {
                        //res.json({status:status, flag:0});
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
        educationModel.listByOwner({owner: req.session.user.username}, function(err, data) {
            if (err){
                res.redirect('/404');
            }else{
                var educationData = {
                    owner: owner,
                    institution: institution,
                    program: program,
                    program_level: program_level,
                };
                educationModel.createEducation(educationData, function(status){
                    if (status == 'ok'){
                        res.json({status:status, flag:1});
                    }else {
                        res.json({status:status, flag:0});
                    }
                });
            }
        });


    }else {
        res.json({status:"not login", flag:0});
    }
});

module.exports = router;