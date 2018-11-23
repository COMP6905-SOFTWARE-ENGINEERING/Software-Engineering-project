var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var matchSchema = new Schema({
    project:{
        type:Schema.Types.ObjectId,
        ref: 'project'
    },
    student:{
        type:Schema.Types.ObjectId,
        ref: 'profile'
    },
    created_at:Date,
    status:{
        type:String,
        default: 'disabled',
        enum:['enabled', 'disabled'],
    },
});

var matchModel = mongoose.model('match', matchSchema);

exports.changeStatus = function(callback){
    matchModel.update({
        status: 'enabled'
    }, {
        status: 'disabled'
    }, {
        multi: true
    }, function(err){
        if(err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.createMatch = function(reqData, callback){
    matchModel.create({
        project:reqData.project_id,
        student: reqData.student_id,
        created_at:reqData.created_at,
        status: reqData.status,
    }, function(err){
        if(err){
            callback(err);
        }else{
            callback('ok');
        }
    });
};
