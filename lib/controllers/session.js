'use strict';

var passport = require('passport'),
	mongoose = require('mongoose');

/* Session APIs */

// Check for presence of a session
// Returns userInfo if successful

exports.check = function(req,res) {
	res.json(req.user.userInfo);
};

// Adds a session (used for login)
// Returns userInfo if successful

exports.add = function(req,res,next) {
	passport.authenticate('local', function(err,user,info) {
		var error = err || info;
		if (error) {
			res.json(400, error);
		}
		req.login(user, function(err) {
			if (err) {
				res.json(400, err);
			}
			res.json(user.userInfo);
		});
	})(req,res,next);
};

// Removes a session (used for logout)

exports.remove = function(req,res) {
	if (req.user) {
		req.logout();
		res.send(200);
	} else {
		res.send(400, 'Not logged in!');
	}
};
