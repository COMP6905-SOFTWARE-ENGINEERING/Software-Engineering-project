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
    }
});

var matchModel = mongoose.model('match', matchSchema);
