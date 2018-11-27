var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var offerSchema = new Schema({
    decision: Boolean,
    owner:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    project:{
        type:Schema.Types.ObjectId,
        ref: 'project'
    }
});

var offerModel = mongoose.model('offer', offerSchema);

exports.findById = function(reqData, callback){
    offerModel.findById(reqData._id, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};