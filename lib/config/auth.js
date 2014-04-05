'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	return next();
	}
	console.log("From: auth.js: Not authenticated");
	res.send(401);
};

/*
exports.ensureRightUser = function ensureRightUser(req, res, next) {
	if (req.userId === req.)
}

*/
