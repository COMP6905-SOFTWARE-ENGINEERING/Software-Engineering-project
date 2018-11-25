var express = require('express');
var mongoose = require('mongoose');
var staticModel = require('./static_db.js');

var Schema = mongoose.Schema;
var countrySchema = new Schema({
    country_name: String,
});

var countryModel = mongoose.model('countries', countrySchema);

exports.findAll = function(callback){
    countryModel.find({}, ['Country'], function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};