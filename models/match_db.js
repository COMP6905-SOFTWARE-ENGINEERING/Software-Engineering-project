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

module.exports = matchModel;

// exports.changeStatus = function(callback){
//     matchModel.update({
//         status: 'enabled'
//     }, {
//         status: 'disabled'
//     }, {
//         multi: true
//     }, function(err){
//         if(err){
//             callback(err);
//         }else {
//             callback('ok');
//         }
//     });
// };

// exports.createMatch = function(reqData, callback){
//     matchModel.create({
//         project:reqData.project_id,
//         student: reqData.student_id,
//         created_at:reqData.created_at,
//         status: reqData.status,
//     }, function(err){
//         if(err){
//             callback(err);
//         }else{
//             callback('ok');
//         }
//     });
// };

// exports.findAll = function(callback){
//     projectModel.find({}, ['_id','project_name', 'area_of_study', 'level_of_study',
//         'required_program', 'required_skills', 'project_description',
//         'available_funding','start_date'], function(err, data){
//         if(err){
//             callback(err, null);
//         }else {
//             callback('ok', data);
//         }
//     });
// };