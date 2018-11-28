var express = require('express');
var crypto = require('crypto');
var url = require('url');
var router = express.Router();
var projectModel = require('../models/project_db.js');
var profileModel = require('../models/profile_db.js');
var matchModel = require('../models/match_db.js');
var userModel = require('../models/user_mgmt_db.js');
var matching = require('../algorithms/match.js');


router.get('/projectlist', function(req, res){
    if(req.session.user && req.session.user.usertype == 'manager'){
        projectModel.listByOwner({owner: req.session.user.username}, function(err, data){
            if (err){
                res.json(err);
            }else {
                var urlData = url.parse(req.url, true).query;
                var page = urlData.page;
                if (page == null){
                    page = 1;
                }
                res.render('project_list', {
                    title: 'manage projects',
                    userdata: req.session.user,
                    projectList: data.slice((page-1)*10, page*10),
                    page: page,
                    maxpage: parseInt((data.length-1)/10)+1,
                });
            }
        });
    }else {
        res.redirect('/login');
    }
});

router.get('/create_project', function(req, res){
    if(req.session.user && req.session.user.usertype == 'manager'){
        userModel.userAccInfo({username:req.session.user.username}, function(err, data){
            if (err == 'ok'){
                var projectData = {
                   // managername: data.managername,
                };
                res.render('project_create', {
                    title:'Create Project',
                    userdata: req.session.user,
                    projectData: projectData,
                });
            }else {
                res.json(err);
            }
        });
    }else {
        res.redirect('/login');
    }
});

router.post('/create_project', function(req, res){
    if(req.session.user && req.session.user.usertype == 'manager'){
        var projectData = {
            owner: req.body.user_id,
            project_name: req.body.project_name,
            project_description: req.body.project_description,
            available_funding: req.body.available_funding,
            required_skills: req.body.required_skills.split(','),
            area_of_study: req.body.area_of_study,
            level_of_study: req.body.level_of_study,
            required_program: req.body.required_program,
            start_date: req.body.start_date,
        };
        // step 1. create the project
        projectModel.createProject(projectData, function(status){
            if (status == 'ok'){
                // step 2. fetch all projects
                projectModel.findAll(function(status, projects) {
                    if (status == 'ok'){
                        // step 3. fetch all profiles
                        profileModel.findAll(function(status, profiles) {
                            if (status == 'ok'){
                                // step 4. call the matching algorithm
                                matching(projects, profiles, 0.5)
                            }else{
                                console.log(status)
                            }
                        })

                    }else{
                        console.log(status)
                    }
                })

                res.json({status:status, flag:1});
            }else {

                res.json({status:status, flag:0});
            }
        });


        // // trigger match process
        // var projects;
        // projectModel.findAll(function (status, data) {
        //     if (status == 'ok'){
        //         projects = data;
        //     }else {
        //         console.log('retrieve all documents in project collection failed')
        //     }
        // })
        // var profiles;
        // profileModel.findAll(function (status, data) {
        //     if (status == 'ok'){
        //         profiles = data;
        //     }else {
        //         console.log('retrieve all documents in profile collection failed')
        //     }
        // })
        // matching(projects, profiles, 0.6);
    }else {
        res.json({status:"Not log in yet", flag:0});
    }
});


module.exports = router;
