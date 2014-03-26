'use strict';

var _ = require('lodash');

/**
 * Load environment configuration. Global configuration settings are located in all.js, while environment-specific configuration settings are separated in their own ./env/ NODE_ENV folder.
 */
module.exports = _.merge(
    require('./env/all.js'),
    require('./env/' + process.env.NODE_ENV + '.js') || {});