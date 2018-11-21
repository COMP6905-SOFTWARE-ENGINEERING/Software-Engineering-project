var express = require('express');
var mongoose = require('mongoose');
var staticModel = require('./static_db.js');

var Schema = mongoose.Schema;
var profileSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },

    addressLine1: String,
    addressLine2: String,
    addressLine3: String,
    country: String,
    province: String,
    city: String,
    postalCode: String,
    work_experience: String,
    research_interest: String,
    education:[{type: String}],
    // education: [
    //     {
    //         edCountry: String,
    //         edProvince: String,
    //         edInstitution: String,
    //         edProgram: String,
    //         edProgramLevel: String,
    //         edStart: Date,
    //         edEnd: Date
    //     }
    // ],
    skills: [{type: String}],
    needFS: String,
    // address:{
    //     type:String,
    //     required:[true, 'please input your address'],
    //     match:[/^(0[1-9]|[1-9]\d){2}00$/, 'please check your address again'],
    // },
    // work_experience: [{type:String}],
    // research_interest:{
    //     type:String,
    //     required:[true, 'research interest cannot be empty'],
    //     trim:true,
    // },
    intended_start_date:{
        type:Date,
        required:[true, 'please input intended start date'],
    },
    // education: [{type:Schema.Types.ObjectId, ref: 'education'}],
    // skills: [{type:Schema.Types.ObjectId, ref: 'skill'}],
    // need_financial_support:{
    //     type:Boolean,
    //     required:[true, 'please select if you want financial support'],
    //     default:true
    // }
});

// profileSchema.pre('save', function (next) {
// 	this.fullname = this.owner + '.' + this.profilename;
// 	next();
// });

var profileModel = mongoose.model('profile', profileSchema);


exports.listByOwner = function(reqData, callback){
    profileModel.find(reqData, ['_id'], {sort:{_id: 1}}, function(err, data){
        if (err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.createProfile = function(reqData, callback){
    var Data = reqData;
    profileModel.create(Data, function(err, data){
        if (err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

exports.findById = function(reqData, callback){
    profileModel.findById(reqData._id, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.changeCollect = function(reqData, callback){
    var Data = reqData.Data;
    profileModel.update({
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
    profileModel.update({
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
    profileModel.remove({_id: Data._id}, function(err, data){
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
    profileModel.find(Data,
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
    profileModel.find({'deliverer._id':Data}, {
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
    profileModel.findOne({
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
    profileModel.find(Data, {
        deliverer:0,
    }, function(err, data){
        if(err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};