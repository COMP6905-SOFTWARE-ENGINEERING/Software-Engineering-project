var express = require('express');
var router = express.Router();
var profileModel = require('../models/profile_db.js');
var matchModel = require('../models/match_db.js');


router.get('/result_for_student', function(req, res) {
    if (req.session.user){
        profileModel.find({owner: req.session.user._id}, function(err, data){
            if(err){
                console.log(err)
            }else{
                matchModel.find({student: data[0]._id}).
                populate({path: 'project', select: 'project_name project_description level_of_study required_program start_date available_funding'}).
                exec(function(err, match_data) {
                        if(err){
                            console.log(err);
                        }else{
                            console.log(match_data);
                            var project_data = [];
                            for(var i = 0; i < match_data.length; i++){
                                project_data.push(match_data[i].project);
                            }
                            res.render('project_match', {
                                title: 'match result',
                                userdata: req.session.user,
                                status: 'ok',
                                data: project_data,
                            });
                        }
                    })
            }
        })
    }else {
        res.redirect('/login');
    }
});

router.get('/result_for_manager', function(req, res) {
    if (req.session.user){
        matchModel.find().
            populate({path: 'project', select: 'project_name'}).
            populate({path:'student', select: 'address', populate: { path: 'owner' }}).
            exec(function (err, match_data) {
                if(err){
                    console.log(err);
                }else{
                    console.log(match_data);
                    res.render('manager_match', {
                        title: 'match result',
                        userdata: req.session.user,
                        status: 'ok',
                        match_data: match_data
                    });
                }

        });
    }else {
        res.redirect('/login');
    }
});

router.get('/communication', function(req, res) {
    if (req.session.user){
        res.render('communication');
    }else {
        res.redirect('/login');
    }
});

module.exports = router;