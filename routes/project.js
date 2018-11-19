var express = require('express');
var crypto = require('crypto');
var url = require('url');
var router = express.Router();
var projectModel = require('../models/project_db.js');
var profileModel = require('../models/profile_db.js');
var userModel = require('../models/user_mgmt_db.js');


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
                    title:'create project',
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
        var projectData = req.body;
        projectData['editdate'] = new Date();
        projectData['salary'] = JSON.parse(projectData.salary);
        projectModel.createOffer(projectData, function(status){
            if (status == 'ok'){
                res.json({status:status, flag:1});
            }else {
                res.json({status:status, flag:0});
            }
        });
    }else {
        res.json({status:"Not log in yet", flag:0});
    }
});

module.exports = router;
