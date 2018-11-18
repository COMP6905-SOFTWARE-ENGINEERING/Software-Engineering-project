var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var projectSchema = new Schema({
    project_manager:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    project_name:{
        type:String,
        unique:true,
        select:true,
        required:[true, 'project name cannot be empty'],
        match:[/^[a-zA-Z](\w)*$/, 'project name should start with alphabet and contain only alphabet and underline']
    },
    project_description:{
        type:String,
        unique:true,
        required:[true,'project description cannot be empty'],
        trim:true
    },
    funding:{
        type:Number,
        required:[true, 'please input funding'],
        min:[0, 'please enter a value between 0 and 50000'],
        max:[50000, 'please enter a value between 0 and 50000']
    },
    required_skills: [{type:Schema.Types.ObjectId, ref: 'skill'}],
    start_date:{
        type:Date,
        required:[true,'start date cannot be empty']
    },
    application_deadline:{
        type:Date,
        required:[true,'application deadline cannot be empty']
    }
});

var projectModel = mongoose.model('project', projectSchema);

exports.listByOwner = function(reqData, callback){
    projectModel.find(reqData, ['_id', 'isDefault', 'isPublic', 'profilename', 'realname', 'deliverer'], {sort:{_id: 1}}, function(err, data){
        if (err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.createProfile = function(reqData, callback){
    var Data = reqData;
    projectModel.create(Data, function(err, data){
        if (err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.findById = function(reqData, callback){
    projectModel.findById(reqData._id, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

