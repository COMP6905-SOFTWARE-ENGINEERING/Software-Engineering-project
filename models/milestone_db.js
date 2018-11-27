var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var milestoneSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },

    event: String,
    date: Date
});

var milestoneModel = mongoose.model('milestone', milestoneSchema);

exports.listByOwner = function(reqData, callback){
    milestoneModel.find(reqData, ['_id'], {sort:{_id: 1}}, function(err, data){
        if (err){
            callback(err, null);
        }else {
            callback(null, data);
        }
    });
};

exports.createMilestone = function(reqData, callback){
    milestoneModel.insertMany(reqData, function(err, data){
        if (err){
            callback(err);
        }else {
            callback('ok');
        }
    });
};

