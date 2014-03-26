'use strict';

// Express is required. path and fs are required for recursive require-ing of Mongoose models in lib/models

var express = require('express'),
	path = require('path'),
	fs = require('fs');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

var app = express();

// Connect to Mongo (added by me)
require('./lib/db/mongo').connect;

// Set up Mongoose models (added by me)
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Passport Strategy and Settings (added by me)
require('./lib/config/pass');

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;