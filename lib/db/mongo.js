// This file is called directly by the main server.js. It requires mongoose, and uses it to connect to MongoDB.

// MongoDB's configuration and path is set in ../config/config (specifically, in all.js, which is required by config.js)

'use strict';

var mongoose = require('mongoose'),
    config = require('../config/config');

exports.mongoose = mongoose;

var mongoOptions = { db: { safe: true } };

// Connect to Database
exports.connect = mongoose.connect(config.db, mongoOptions, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + config.db + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.db);
  }
});