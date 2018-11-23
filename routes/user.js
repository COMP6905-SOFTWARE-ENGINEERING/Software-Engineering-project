var express = require('express');
var crypto = require('crypto');
var url = require('url');
var router = express.Router();
var profileModel = require('../models/profile_db.js');
var educationModel = require('../models/education_db');
var experienceModel = require('../models/experience_db');
var userModel = require('../models/user_mgmt_db.js');
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
    var countriesArray=[];
    var programsArray=[];
    mongo.connect('mongodb://127.0.0.1:27017/GradRecDB',function (err,db) {
        assert.equal(null,err);
        var countries = db.collection('countries').find();
        countries.forEach(function (doc,err) {
            assert.equal(null,err);
            countriesArray.push(doc);
        },function () {
            db.close();
        });
        var programs = db.collection('programs').find();
        programs.forEach(function (doc,err) {
            assert.equal(null,err);
            programsArray.push(doc);
        }, function () {
            db.close();
        });
    });
    if(req.session.user && req.session.user.usertype == 'student'){
        userModel.userAccInfo({username:req.session.user.username}, function(err, data){
            if (err == 'ok'){
                var profileData = {
                    //realname: data.realname,
                };
                res.render('profile_create', {
                    title:'Create Profile',
                    userdata: req.session.user,
                    profileData: profileData,
                    countries: countriesArray,
                    programs: programsArray,
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
            }
        });
    }else {
        res.json({status:"not login", flag:0});
    }
});

module.exports = router;