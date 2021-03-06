'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var UserSchema = new Schema({
	username: {
    type: String,
    unique: true,
    required: true
  },
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

UserSchema.virtual('userInfo').get(function(){
	return {
		'_id': this._id,
    'username': this.username,
		'email': this.email
	};
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

UserSchema.statics.userLogin = function(username, password, done) {
  // Check if entry is an email containing "@", if so, then check with emails instead
  var criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
  this.findOne(criteria, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        'errors': {
          'username': { type: 'Username is not registered.' }
        }
      });
    }
    if (!user.authenticate(password)) {
      return done(null, false, {
        'errors': {
          'password': { type: 'Password is incorrect.' }
        }
      });
    }
    return done(null, user);
  });
};

mongoose.model('User', UserSchema);
