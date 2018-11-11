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
                    offerList: data.slice((page-1)*10, page*10),
                    page: page,
                    maxpage: parseInt((data.length-1)/10)+1,
                });
            }
        });
    }else {
        res.redirect('/login');
    }
});

module.exports = router;
