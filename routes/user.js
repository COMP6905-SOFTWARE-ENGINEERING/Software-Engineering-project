var express = require('express');
var crypto = require('crypto');
var url = require('url');
var router = express.Router();
var profileModel = require('../models/profile_db.js');
var educationModel = require('../models/education_db');
var experienceModel = require('../models/experience_db');
var userModel = require('../models/user_mgmt_db.js');
var countryModel = require('../models/country_db.js');
var dbURL = require('../config/default');
var milestoneModel = require('../models/milestone_db');
var userModel = require('../models/user_mgmt_db.js');
var programModel = require('../models/area_db');
var projectModel = require('../models/project_db');
var matching = require('../algorithms/match');


router.get('/dashboard', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
            if (err){
                res.json(err);
            }else {
                var studentData = {};
                profileModel.userAccInfo({username:req.session.user.username}, function(err, data) {
                    console.log("No error");
                    studentData = data;
                    console.log(data);
                });
                res.render('dashboard', {
                    title: 'Dashboard',
                    userdata: req.session.user,
                    studentData:studentData
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

                var personalData = {};
                userModel.userAccInfo({username:req.session.user.user_id}, function(err, data){
                    personalData = data;
                    console.log(data);
                });

                var programs = [];
                programModel.findAll(function (err, data) {
                    programs = data;
                    console.log(programs);
                });

                res.render('profile_create', {
                    title:'Create Profile',
                    userdata: req.session.user,
                    countries: countries,
                    programs: programs,
                    personalData:personalData,
                });
            }else {
                res.json(err);
            }
        });
    }else {
        res.redirect('/login');
    }
});
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
        let institution = req.body.educationInstitution.split(',');
        var program = req.body.educationProgram.split(',');
        var program_level = req.body.educationLevel.split(',');

        var education = [institution.length];
        var i = 0;
        for (i=0; i<institution.length;i++){
            var arrayEducation = {
                owner: owner,
                institution: institution[i],
                program: program[i],
                program_level: program_level[i],
            };
            education[i] = arrayEducation;
        }

        //Work Experience Data
        var weCompany = req.body.weCompany.split(',');
        var weTitle = req.body.weTitle.split(',');
        var weStartDate = req.body.weStartDate.split(',');
        var weEndDate = req.body.weEndDate.split(',');

        var experience = [weCompany.length];
        var i = 0;
        for (i=0; i<weCompany.length;i++){
            var arrayExperience = {
                owner: owner,
                title: weCompany[i],
                company: weTitle[i],
                startDate: weStartDate[i],
                endDate:weEndDate[i]
            };
            experience[i] = arrayExperience;
        }

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

                profileModel.createProfile(profileData, function(status){
                    if (status == 'ok'){
                        //Step 2. Fetch all the profiles
                        profileModel.findAll(function (status, profiles) {
                            if(status =='ok'){
                                //Step 3. Fetch all the profiles
                                projectModel.findAll(function (status, projects) {
                                    if(status=='ok'){
                                        //Step 4. Call the maatching algorithm using profile and projects as inputs
                                        matching(projects,profiles,0.1)
                                    }else {
                                        console.log(status)
                                    }
                                })

                            }else{
                                console.log(status)
                            }
                        })

                        //res.json({status:status, flag:1});
                    }else {
                        //res.json({status:status, flag:0});
                    }
                });
                //Step 1. Create the profile

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
                educationModel.createEducation(education, function(status){
                    if (status == 'ok'){
                        console.log(education);
                        //res.json({status:status, flag:1});
                    }else {
                        //res.json({status:status, flag:0});
                    }
                });
            }
        });
        experienceModel.listByOwner({owner: req.session.user.username}, function(err, data) {
            if (err){
                res.redirect('/404');
            }else{
                experienceModel.createExperience(experience, function(status){
                    if (status == 'ok'){
                        console.log(experience);
                        //res.json({status:status, flag:1});
                    }else {
                        //res.json({status:status, flag:0});
                    }
                });
            }
        });
        experienceModel.listByOwner({owner: req.session.user.username}, function(err, data) {
            if (err){
                res.redirect('/404');
            }else {
                var today = new Date();
                var milestone = {
                    owner: owner,
                    event: "Application Profile created",
                    date: today
            }
                milestoneModel.createMilestone(milestone, function(status){
                    if (status == 'ok'){
                        console.log(experience);
                        res.json({status:status, flag:1});
                    }else {
                        res.json({status:status, flag:0});
                    }
                });
            }
        });
        // profileModel.createProfile(profileData, function(status){
        //     if (status == 'ok'){
        //         //Step 2. Fetch all the profiles
        //         profileModel.findAll(function (status, profiles) {
        //             if(status =='ok'){
        //                 //Step 3. Fetch all the profiles
        //                 projectModel.findAll(function (status, projects) {
        //                     if(status=='ok'){
        //                         //Step 4. Call the maatching algorithm using profile and projects as inputs
        //                         matching(projects,profiles,0.1)
        //                     }else {
        //                         console.log(status)
        //                     }
        //                 })
        //
        //             }else{
        //                 console.log(status)
        //             }
        //         })
        //
        //         res.json({status:status, flag:1});
        //     }else {
        //         res.json({status:status, flag:0});
        //     }
        // });

    }else {
        res.json({status:"Not log in yet", flag:0});
    }
});

module.exports = router;