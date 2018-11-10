var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var studentSchema = new Schema({
	firstname:{
		type:String,
		unique:true,
		select:true,
		required:[true, '用户名不能为空'],
		match:[/^[a-zA-Z](\w)*$/, '用户名须以字母开始，且只能包含字母数字下划线']
	},
    lastname:{
        type:String,
        unique:true,
        required:[true,'姓名不能为空'],
        trim:true,
    },
	password:{
		type:String,
		required:[true, '密码不能为空'],
		match:[/^(\S)*$/, '密码不能包含空格'],
	},
	email:{
		type:String,
		unique:true,
		required:[true, '邮箱不能为空'],
		trim:true,
		match:[/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/, '请输入正确的邮箱']
	},
	sex:{
		type:String,
		default: 'secret',
		enum:['male', 'female', 'secret'],
	},
	age:{
		type:Number,
		min:[18, '输入年龄过小'],
		max:[60, '输入年龄过大'],
	},
	address:{
		type:String,
	},
});

studentSchema.index({username:1});
var studentModel = mongoose.model('students', studentSchema);

exports.studentLogin = function(reqData, callback){
	studentModel.findOne({username:reqData.username}, function(err, data){
		if (err){
			callback(err);
		}else if (data != null){
			if (data.password == reqData.password){
				callback('ok');
			}else{
				callback('密码错误');
			}
		}else{
			callback('用户不存在');
		}
	});
};

exports.studentRegister = function(reqData, callback){
	studentModel.create({
		firstname:reqData.firstname,
        lastname: reqData.lastname,
		password:reqData.password,
		email: reqData.email,
	}, function(err, data){
		if(err){
			callback(err);
		}else{
			callback('ok');
		}
	});
};

exports.studentCfmEmail = function(reqData, callback){
	studentModel.findOne({username:reqData.username}, function(err, data){
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

exports.studentChgPwd = function(reqData, callback){
	studentModel.update({username:reqData.username}, {$set: {password: reqData.password}}, {runValidators: true}, function(err, data){
		if (err){
			callback(err);
		}else {
			callback('ok');
		}
	});
};

exports.studentModInfo = function(reqData, callback){
	studentModel.update({username:reqData.username}, {$set: reqData}, {runValidators: true}, function(err, data){
		if (err){
			callback(err);
		}else {
			callback('ok');
		}
	});
};

exports.studentAccInfo = function(reqData, callback){
	studentModel.findOne({username:reqData.username}, function(err, data){
		if (err){
			// err.err = 'err';
			callback(err, null);
		}else {
			// data.err = 'ok';
			callback('ok', data);
		}
	});
};
