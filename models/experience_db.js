var express = require('express');
var mongoose = require('mongoose');
var staticModel = require('./static_db.js');

var Schema = mongoose.Schema;
var experienceSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    // Experience
    title: String,
    company: String,
    startDate: Date,
    endDate: Date
});

var experienceModel = mongoose.model('experience', experienceSchema);


exports.listByOwner = function(reqData, callback){
    experienceModel.find(reqData, ['_id'], {sort:{_id: 1}}, function(err, data){
        if (err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.createExperience = function(reqData, callback){
    var Data = reqData;
    experienceModel.insertMany(Data, function(err, data){
        if (err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.findById = function(reqData, callback){
    experienceModel.findById(reqData._id, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.changeCollect = function(reqData, callback){
    var Data = reqData.Data;
    experienceModel.update({
        _id: Data._id,
        'deliverer._id':Data.deliverer_id
    }, {
        $set:{'deliverer.$.isCollected':Data.isCollected}
    }, function(err, data){
        if(err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.adminPrivatize = function(reqData, callback){
    var Data = reqData.Data;
    experienceModel.update({
        _id:Data._id,
    }, {$set:{
        isPublic:false,
    }}, function(err, data){
        if(err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.adminDelete = function(reqData, callback){
    var Data = reqData.Data;
    experienceModel.remove({_id: Data._id}, function(err, data){
        if (err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.search = function(reqData, callback){
    var Data = {isPublic: true};
    var sortRul = reqData.sortRul;
    if(reqData.Data.education){
        Data["education"] = {$lte:reqData.Data.education};
    }
    if(reqData.Data.experience){
        Data["experience"] = {$gte:reqData.Data.experience};
    }
    if(reqData.Data.location){
        if(reqData.Data.location.slice(2,4) != '00'){
            Data["location"] = reqData.Data.location;
        }else{
            var pattern = new RegExp("^"+reqData.Data.location.slice(0,2)+"\\d{4}$");
            Data["location"] = {$regex:pattern};
        }
    }
    if(reqData.Data.job){
        if(reqData.Data.job.slice(4,6) != '00'){
            Data["job"] = reqData.Data.job;
        }else if(reqData.Data.job.slice(2,4) != '00'){
            var pattern = new RegExp("^"+reqData.Data.job.slice(0,4)+"\\d{2}$");
            Data["job"] = {$regex:pattern};
        }else {
            var pattern = new RegExp("^"+reqData.Data.job.slice(0,2)+"\\d{4}$");
            Data["job"] = {$regex:pattern};
        }
    }
    if(reqData.Data.salary_min){
        Data["salary.0"] = {$gte:reqData.Data.salary_min};
    }
    if(reqData.Data.salary_max){
        Data["salary.1"] = {$lte:reqData.Data.salary_max};
    }
    experienceModel.find(Data,
        // {
        // 	companyname:{$regex:Data.companyname},
        // 	offername:{$regex:Data.offername},
        // 	location:Data.location,
        // 	job:Data.job,
        // 	// salary:{$all:[{$gte:Data.salary_min},{$lte:Data.salary_max}]},
        // 	isApproved:true,
        {
            '_id':1,
            'realname':1,
            'school':1,
            'location_str':1,
            'offername':1,
            'education':1,
            'experience':1,
        }, {sort:{id:-1}},
        function(err, data){
            if(err){
                callback(err, null);
            }else {
                callback(null, data);
            }
        }
    );
};

exports.findByOfferId = function(reqData, callback){
    var Data = reqData.Data;
    experienceModel.find({'deliverer._id':Data}, {
        '_id':1,
        'realname':1,
        'deliverer.$':1,
    }, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.findDefaultOne = function(reqData, callback){
    var Data = reqData.Data;
    experienceModel.findOne({
        owner:Data.owner,
        isDefault:true,
    }, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.findByCondition = function(reqData, callback){
    var Data = reqData.Data;
    experienceModel.find(Data, {
        deliverer:0,
    }, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};