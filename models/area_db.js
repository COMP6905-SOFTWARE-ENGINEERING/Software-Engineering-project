var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var areaSchema = new Schema({
    area: String,
});

var areaModel = mongoose.model('areas', areaSchema);

exports.findAll = function(callback){
    areaModel.find({}, ['area'], function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback('ok', data);
        }
    });
};