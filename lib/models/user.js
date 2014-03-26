'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	sutd_id: {
		type: Number,
		unique: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: String,
	joinDate: Date,
	admin: Boolean
},

// Schema Options

{
	strict: true
});

// Schema Virtuals

UserSchema.virtual('password').set(function(password) {
	this._password = password; // To investigate
	this.salt = this.makeSalt();
	this.hashedPassword = this.encryptPassword(password);
});

UserSchema.methods = {

	// Compare the hashed password entered with the user's existing associated hashedPassword. Is called by pass.js's LocalStrategy.
	authenticate: function(plainTextPassword) {
		return this.encryptPassword(plainTextPassword) === this.hashedPassword;
	},

	makeSalt: function() {
		return crypto.randomBytes(16).toString('base64');
	},

	encryptPassword: function(plainTextPassword) {
		if (!plainTextPassword || !this.salt) {
			return '';
		}
		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(plainTextPassword, salt, 10000, 64).toString('base64');
	}

};

mongoose.model('User', UserSchema);