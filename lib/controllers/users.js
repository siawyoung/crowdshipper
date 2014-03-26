'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	passport = require('passport'),
	ObjectId = mongoose.Types.ObjectId;

/**
 * User APIs.
 */

exports.register = function (req,res) {
	console.log(req.body);
	var newUser = new User(req.body);
	console.log(newUser);
	newUser.save(function(err) {
		if (err) {
			console.log(err);
			console.log("Couldn't save registration data to database");
			return res.json(400, err);
		}


	});

	return res.send(200);
};

exports.login = function(req,res) {
	return res.send(400);
};

exports.show = function(req,res) {
	return res.send(400);
};