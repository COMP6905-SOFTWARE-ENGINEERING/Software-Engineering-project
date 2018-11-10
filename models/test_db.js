var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var testSchema = new Schema({
	a:{type:String, required:true},
	b:{type:String, required:true},
	c:{type:String, required:true},
	d:{type:[Number]},
});

var testModel = mongoose.model('tests', testSchema);

exports.create = function(reqData, callback){
	testModel.create(reqData, function(err, data){
		callback(err, data);
	});
};

exports.remove = function(reqData, callback){
	testModel.remove({a:reqData.a, b:reqData.b}, function(err, data){
		callback(err, data);
	});
};

exports.find = function(reqData, callback){
	testModel.find({a:reqData.a, b:reqData.b}, function(err, data){
		callback(err, data);
	});
};

exports.update = function(reqData, callback){
	testModel.update({a:reqData.a, b:reqData.b}, reqData, function(err, data){
		callback(err, data);
	});
};

exports.findarr = function(reqData, callback){
	testModel.find({a:reqData.a, b:reqData.b}, function(err, data){
		callback(err, data);
	});
};