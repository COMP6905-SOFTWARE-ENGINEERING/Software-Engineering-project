var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var staticSchema = new Schema({
    number:{type:String, unique:true},
    name:{type:String},
});

var staticJobModel = mongoose.model('jobs', staticSchema);

exports.getFunction = function(reqData, callback){
    var regexobj = new RegExp(reqData.slice(0,2)+"\\d{2}00");
    staticJobModel.find({number:regexobj}, {"_id":-1, "number":1, "name":1}, {sort:{number: 1}}, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};