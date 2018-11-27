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
        middlename:req.body.middlename,
        lastname: req.body.lastname,
        sex:req.body.sex,
        password: password,
        email: req.body.email,
        dob: req.body.dob
    };
	accMgmtModel.register(registerData, function(status, data){
		if (status == 'ok'){
            req.session.user = data;
            res.json({status:status, flag:1});
		}else if (status.code == 11000){
            if (status.errmsg.indexOf('username') > 0){
                res.json({status:'username already exists', flag:0, errKey: 'username'});
            }else if (status.errmsg.indexOf('email') > 0){
                res.json({status:'email already exists', flag:0, errKey: 'email'});
            }
		}else {
			res.json({status:status, flag:2});
		}
	});
});



module.exports = router;
