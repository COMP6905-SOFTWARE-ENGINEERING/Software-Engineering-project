var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
	firstname:{
		type:String,
		select:true,
		required:[true, 'firstname cannot be empty'],
	},
	middlename:String,
    lastname:{
        type:String,
        required:[true,'lastname cannot be empty'],
        trim:true,
    },
	password:{
		type:String,
		required:[true, 'password cannot be empty'],
		match:[/^(\S)*$/, 'password cannot contain space'],
	},
	email:{
		type:String,
		unique:true,
		required:[true, 'email cannot be empty'],
		trim:true,
		match:[/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/, 'please enter a valid email']
	},
	sex:String,
	date_of_birth:Date,
    usertype:{
		type:String,
		default: 'student',
        enum:['student', 'manager'],
	},
});

userSchema.index({email:1});
var userModel = mongoose.model('users', userSchema);

exports.userLogin = function(reqData, callback){
	userModel.findOne({email:reqData.email}, function(err, data){
		if (err){
			callback(err);
		}else if (data != null){
			if (data.password === reqData.password){
				callback('ok', data);
			}else{
				callback('wrong password', null);
			}
		}else{
			callback('user not exist', null);
		}
	});
};

exports.userRegister = function(reqData, callback){
	userModel.create({
		firstname:reqData.firstname,
		middlename:reqData.middlename,
        lastname: reqData.lastname,
		sex:reqData.sex,
		password:reqData.password,
		email: reqData.email,
        date_of_birth: reqData.dob,
	}, function(err, data){
		if(err){
			callback(err, data);
		}else{
			callback('ok', data);
		}
	});
};

exports.userCfmEmail = function(reqData, callback){
	userModel.findOne({username:reqData.username}, function(err, data){
		if (err){
			callback(err);
		}else if (data != null){
			if (data.email == reqData.email_confirm){
				callback('ok');
			}else{
				callback('邮箱错误');
			}
		}else{
			callback('用户不存在');
		}
	});
};

exports.userChgPwd = function(reqData, callback){
	userModel.update({username:reqData.username}, {$set: {password: reqData.password}}, {runValidators: true}, function(err, data){
		if (err){
			callback(err);
		}else {
			callback('ok');
		}
	});
};

exports.userModInfo = function(reqData, callback){
	userModel.update({username:reqData.username}, {$set: reqData}, {runValidators: true}, function(err, data){
		if (err){
			callback(err);
		}else {
			callback('ok');
		}
	});
};

exports.userAccInfo = function(reqData, callback){
	userModel.findOne({username:reqData.username}, function(err, data){
		if (err){
			// err.err = 'err';
			callback(err, null);
		}else {
			// data.err = 'ok';
			callback('ok', data);
		}
	});
};

exports.userAccInfo = function(reqData, callback){
    userModel.findOne({username:reqData.username}, function(err, data){
        if (err){
            // err.err = 'err';
            callback(err, null);
        }else {
            // data.err = 'ok';
            callback('ok', data);
        }
    });
};

exports.findById = function(reqData, callback){
    userModel.findById({_id: reqData._id}, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

