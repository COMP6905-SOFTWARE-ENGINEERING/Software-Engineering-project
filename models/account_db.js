var express = require('express');
var mongoose = require('mongoose');
var userMgmt = require('./user_mgmt_db');
//var companyMgmt = require('./company_mgmt_db');
//var adminMgmt = require('./admin_mgmt_db');

exports.login = function(reqData, callback){
    var roles = ['student', 'manager'];
	if (roles.includes(reqData.usertype)){
		userMgmt.userLogin(reqData, callback);
	}else {
		callback('usertype error');
	}
};


exports.register = function(reqData, callback){
	userMgmt.userRegister(reqData, callback);
};

exports.cfmEmail = function(reqData, callback){
	if (reqData.usertype == 'user'){
		userMgmt.userCfmEmail(reqData, callback);
	}else if (reqData.usertype == 'company') {
		companyMgmt.companyCfmEmail(reqData, callback);
	}else {
		callback('usertype error');
	}
};

exports.chgPwd = function(reqData, callback){
	if (reqData.usertype == 'user'){
		userMgmt.userChgPwd(reqData, callback);
	}else if (reqData.usertype == 'company') {
		companyMgmt.companyChgPwd(reqData, callback);
	}else {
		callback('usertype error');
	}
};

exports.modInfo = function(reqData, callback){
	var usertype = reqData.usertype;
	delete reqData.usertype;
	// console.log(reqData);
	if (usertype == 'user'){
		// console.log(reqData);
		userMgmt.userModInfo(reqData, callback);
	}else if (usertype == 'company') {
		companyMgmt.companyModInfo(reqData, callback);
	}else {
		callback('usertype error');
	}
}

exports.accInfo = function(reqData, callback){
	if (reqData.usertype == 'user'){
		userMgmt.userAccInfo(reqData, callback);
	}else if (reqData.usertype == 'company') {
		companyMgmt.companyAccInfo(reqData, callback);
	}else{
		callback('usertype error', null);
	}
}

