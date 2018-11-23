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

exports.changeStatus = function(reqData, callback){
    var Data = reqData.Data;
    matchModel.update({
        _id: Data._id,
        'deliverer._id':Data.deliverer_id
    }, {
        $set:{'deliverer.$.isCollected':Data.isCollected}
    }, function(err, data){
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
        created_at:reqData.password,
        status: reqData.email,
    }, function(err, data){
        if(err){
            callback(err, data);
        }else{
            callback('ok', data);
        }
    });
};
