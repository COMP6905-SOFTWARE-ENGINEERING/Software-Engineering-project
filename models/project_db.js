var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var projectSchema = new Schema({
    project_name:{
        type:String,
        unique:true,
        select:true,
        required:[true, 'project name cannot be empty'],
        match:[/^[a-zA-Z](\w)*$/, '用户名须以字母开始，且只能包含字母数字下划线']
    },
    project_description:{
        type:String,
        unique:true,
        required:[true,'project description cannot be empty'],
        trim:true,
    },
    funding:{
        type:Number,
        required:[true, 'please input funding'],
        min:[0, '请确认类型无误'],
        max:[50000, '请确认类型无误'],
    },
    start_date:{
        type:Date,
        required:[true,'start date cannot be empty'],
    },
    application_deadline:{
        type:Date,
        required:[true,'application deadline cannot be empty'],
    },
});

var projectModel = mongoose.model('projects', projectSchema);

exports.listByOwner = function(reqData, callback){
    projectModel.find(reqData, ['_id', 'project_name', 'project_description', 'funding', 'start_date', 'application_deadline'], {sort:{_id: 1}}, function(err, data){
        if (err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.projectLogin = function(reqData, callback){
    projectModel.findOne({username:reqData.username, isApproved:true}, function(err, data){
        if (err){
            callback(err);
        }else if (data != null){
            if (data.password == reqData.password){
                callback('ok');
            }else{
                callback('密码错误');
            }
        }else{
            callback('用户不存在或未审核');
        }
    });
};

exports.projectRegister = function(reqData, callback){
    projectModel.create({
        username:reqData.username,
        password:reqData.password,
        email: reqData.email,
        projectname: reqData.projectname,
        projecttype: reqData.projecttype,
        representative: reqData.representative,
        address: reqData.address,
    }, function(err, data){
        if(err){
            callback(err);
        }else{
            callback('ok');
        }
    });
};

exports.projectCfmEmail = function(reqData, callback){
    projectModel.findOne({username:reqData.username}, function(err, data){
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

exports.projectChgPwd = function(reqData, callback){
    projectModel.update({username:reqData.username}, {$set: {password: reqData.password}}, {runValidators: true}, function(err, data){
        if (err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.projectModInfo = function(reqData, callback){
    projectModel.update({username:reqData.username}, {$set: reqData}, {runValidators: true}, function(err, data){
        if (err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.projectAccInfo = function(reqData, callback){
    projectModel.findOne({username:reqData.username}, function(err, data){
        if (err){
            // err.err = 'err';
            callback(err, null);
        }else {
            // data.err = 'ok';
            callback('ok', data);
        }
    });
};

exports.adminApprove = function(reqData, callback){
    projectModel.update({
        username:reqData.username,
    },{
        $set:{isApproved: true}
    }, function(err, data){
        if(err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.adminReject = function(reqData, callback){
    projectModel.remove({
        username:reqData.username,
        isApproved:false,
    }, function(err, data){
        if(err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.getRegList = function(reqData, callback){
    projectModel.find({
        isApproved:reqData.isApproved,
    }, {
        'password':0,
        'email':0,
    }, function(err, data){
        if (err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};