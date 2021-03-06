'use strict';

var express = require('express'),
    path = require('path'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(express),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app) {

  // Development settings
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');
  });

  // end of development settings

  // Production settings
  app.configure('production', function(){
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  // end of production settings

  app.configure(function() {
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());

    app.use(express.session({
      secret: 'BestThingEver1234',
      store: new mongoStore({
      url: config.db,
      collection: 'sessions'
      })
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    // Router (only error handlers should come after this)
    app.use(app.router);
  });

  // Error handler
  app.configure('development', function() {
    app.use(express.errorHandler());
  });


  // Console logs all server requests. Add more console logs as necessary.
  app.configure('development', function() {
      app.post('/*', function(req,res,next) {
        console.log(req.headers);
        console.log(req.body);
        next();
      });
  });
};