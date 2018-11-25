var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var areaSchema = new Schema({
    area: String,
});

var areaModel = mongoose.model('programs', areaSchema);

exports.findAll = function(callback){
    areaModel.find({}, ['area'], function(err, data){
        if(err){
            console.log("there was an error");
            callback(err, null);
        }else {
            console.log("no error");
            callback('ok', data);
        }
    });
};