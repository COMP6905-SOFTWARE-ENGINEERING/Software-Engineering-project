var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var accMgmtModel = require('../models/account_db.js');
// var asdModel = require('../models/others.js');

// router.get('/asd', function(req,res){
// 	asdModel.asd('020000', function(data){
// 		console.log(data);
// 		res.json(data);
// 	});
// });

// router.get('/fgh', function(req,res){
// 	asdModel.fgh('020000', function(data){
// 		console.log(data);
// 		res.json(data);
// 	});
// });


router.get('/', function(req, res, next) {
    if (req.session.user){
        res.redirect('/index');
    }else{
        res.render('signInPage', {title: 'Sign In'});
    }
});

router.post('/',function(req,res){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');
    var loginData = {
        email: req.body.email,
        password: password,
        usertype: req.body.usertype
    };
    // var usertype = req.body.usertype;
    accMgmtModel.login(loginData, function(status){
        if (status == 'ok'){
            // console.log('1');
            req.session.user = {
                firstname: loginData.username,
                usertype: loginData.usertype
            };
            res.json({status:status, flag:1});
        }else{
            res.json({status:status, flag:0});
        }
    });
    // res.json('ok');
    // res.render('login', {flag: 1, title: 'Login Panel'});
});



module.exports = router;