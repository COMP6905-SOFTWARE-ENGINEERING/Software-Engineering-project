var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var accMgmtModel = require('../models/account_db.js');

router.get('/', function(req, res, next) {
	res.render('register', {title: 'register page'});
});

router.post('/',function(req, res){
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('hex');
    var registerData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: password,
        email: req.body.email,
        dob: req.body.dob
    };
	accMgmtModel.register(registerData, function(status){
		if (status == 'ok'){
            req.session.user = {
                firstname: registerData.firstname,
                usertype: 'student'
            };
            res.json({status:status, flag:1});
		}else if (status.code == 11000){
            if (status.errmsg.indexOf('username') > 0){
                res.json({status:'用户名已存在', flag:0, errKey: 'username'});
            }else if (status.errmsg.indexOf('email') > 0){
                res.json({status:'邮箱已存在', flag:0, errKey: 'email'});
            }
		}else {
			res.json({status:status, flag:2});
		}
	});
});



module.exports = router;
