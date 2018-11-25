var express = require('express');
var mongoose = require('mongoose');
var staticModel = require('./static_db.js');

var Schema = mongoose.Schema;
var countrySchema = new Schema({

    Country:String,
    Nationality:String,
    Continent:String,
    Region:String,
    Sub_Region:String
});

var countryModel = mongoose.model('countries', countrySchema);

exports.findAll = function(callback){
    countryModel.find({}, ['country', 'Nationality', 'Continent'], function(err, data){
        if(err){
            //console.log('countries nto loaded');
            callback(err, null);
        }else {
            callback('ok', data);
        }
    });
};