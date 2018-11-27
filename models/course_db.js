var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var courseSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },

    course_name: String,
    project:{
        type:Schema.Types.ObjectId,
            ref: 'project'
    },
    grade: Number,
});

var courseModel = mongoose.model('course', courseSchema);

exports.listByOwner = function(reqData, callback){
    courseModel.find(reqData, ['_id'], {sort:{_id: 1}}, function(err, data){
        if (err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.findById = function(reqData, callback){
    courseModel.findById(reqData._id, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};