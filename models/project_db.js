var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var projectSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    project_name:{
        type:String,
        select:true,
        required:[true, 'project name cannot be empty'],
        // match:[/^[a-zA-Z](\w)*$/, 'project name should start with alphabet and contain only alphabet and underline']
    },
    project_description:{
        type:String,
        required:[true,'project description cannot be empty'],
        trim:true
    },
    // available_funding:{
    //     type:Number,
    //     required:[true, 'please input funding'],
    //     min:[0, 'please enter a value between 0 and 50000'],
    //     max:[50000, 'please enter a value between 0 and 50000']
    // },
    available_funding: String,
    // required_skills: [{type:Schema.Types.ObjectId, ref: 'skill'}],
    field_of_study: String,
    level_of_study: String,
    required_skills: [{type:String}],
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
    projectModel.find(reqData, ['_id'], {sort:{_id: 1}}, function(err, data){
        if (err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.createProject = function(reqData, callback){
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

exports.findAll = function(callback){
    projectModel.find({}, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};
