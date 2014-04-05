'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	passport = require('passport'),
	ObjectId = mongoose.Types.ObjectId;

/**
 * User APIs.
 */

exports.register = function (req,res,next) {
	var newUser = new User(req.body);
	newUser.save(function(err) {
		if (err) {
			console.log(err);
			console.log("Couldn't save registration data to database");
			return res.json(400, err);
		}

		req.logIn(newUser, function(err) {
			if (err) {
				return next(err);
			}
			return res.json(newUser.userInfo);
		});
	});
};

exports.show = function(req,res) {
	return res.send(400);
};
