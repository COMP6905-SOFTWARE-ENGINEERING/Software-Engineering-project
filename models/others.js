var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var educationSchema = new Schema({
    program_name: String,
    university_name: String,
    degree_type:{
        type:String,
        default: 'bachelor',
        enum:['bachelor', 'master', 'doctor']
    },
    start_date: Date,
    end_date: Date,
    country: String
});

var educationModel = mongoose.model('education', educationSchema);


var skillSchema = new Schema({
    skill_name: String
});

var skillModel = mongoose.model('skill', skillSchema);
