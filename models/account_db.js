var express = require('express');
var mongoose = require('mongoose');
var personMgmt = require('./person_mgmt_db');
var companyMgmt = require('./company_mgmt_db');
var adminMgmt = require('./admin_mgmt_db');

exports.login = function(reqData, callback){
	if (reqData.usertype == 'person'){
		personMgmt.personLogin(reqData, callback);
	}else if (reqData.usertype == 'company'){
		companyMgmt.companyLogin(reqData, callback);
	}else if (reqData.usertype == 'admin'){
		adminMgmt.adminLogin(reqData, callback);
	}else {
		callback('usertype error');
	}
};


exports.register = function(reqData, callback){
	personMgmt.personRegister(reqData, callback);
};

exports.cfmEmail = function(reqData, callback){
	if (reqData.usertype == 'person'){
		personMgmt.personCfmEmail(reqData, callback);
	}else if (reqData.usertype == 'company') {
		companyMgmt.companyCfmEmail(reqData, callback);
	}else {
		callback('usertype error');
	}
};

exports.chgPwd = function(reqData, callback){
	if (reqData.usertype == 'person'){
		personMgmt.personChgPwd(reqData, callback);
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
	if (usertype == 'person'){
		// console.log(reqData);
		personMgmt.personModInfo(reqData, callback);
	}else if (usertype == 'company') {
		companyMgmt.companyModInfo(reqData, callback);
	}else {
		callback('usertype error');
	}
}

exports.accInfo = function(reqData, callback){
	if (reqData.usertype == 'person'){
		personMgmt.personAccInfo(reqData, callback);
	}else if (reqData.usertype == 'company') {
		companyMgmt.companyAccInfo(reqData, callback);
	}else{
		callback('usertype error', null);
	}
}

