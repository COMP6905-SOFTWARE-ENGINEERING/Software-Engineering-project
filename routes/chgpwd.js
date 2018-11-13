var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var accMgmtModel = require('../models/account_db.js');

router.post('/', function(req, res){
    // console.log(req.body);
    if(req.session.user){
        res.render('chgpwd', {
            title: 'change password',
            username: req.body.username,
            usertype: req.body.usertype,
            isResetPwd: req.body.isResetPwd
        });
    }else {
        res.redirect('/login');
    }
});

router.post('/confirm', function(req, res){
    if (req.body.isResetPwd != 'true'){
        var oldmd5 = crypto.createHash('md5');
        var oldpassword = oldmd5.update(req.body.oldpassword).digest('hex');
        var confirmData = {
            username: req.body.username,
            password: oldpassword,
            usertype: req.body.usertype
        };
        accMgmtModel.login(confirmData, function(status){
            if (status != 'ok'){
                res.json({status:status, flag:0});
            }else {
                var md5 = crypto.createHash('md5');
                var password = md5.update(req.body.password).digest('hex');
                var chgpwdData = {
                    username: req.body.username,
                    password: password,
                    usertype: req.body.usertype
                };
                accMgmtModel.chgPwd(chgpwdData, function(status){
                    if (status == 'ok'){
                        req.session.user = {
                            firstname: chgpwdData.username,
                            usertype: chgpwdData.usertype
                        };
                        res.json({status:status, flag:1});
                    }else {
                        res.json({status:status, flag:2});
                    }
                });
            }
        });
    }else {
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');
        var chgpwdData = {
            username: req.body.username,
            password: password,
            usertype: req.body.usertype
        };
        accMgmtModel.chgPwd(chgpwdData, function(status){
            if (status == 'ok'){
                req.session.user = {
                    firstname: chgpwdData.username,
                    usertype: chgpwdData.usertype
                };
                res.json({status:status, flag:1});
            }else {
                res.json({status:status, flag:2});
            }
        });
    }
});

module.exports = router;