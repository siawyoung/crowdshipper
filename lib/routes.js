'use strict';

var auth = require('./config/auth');

/**
 * Application routes
 */
module.exports = function(app) {
  
  // Authentication routes!

  var users = require('./controllers/users');
  app.post('/auth/users', users.register);
  // app.post('/auth/users', users.login);
  app.get('/auth/users/:userId', users.show);

  // API routes for items

  var items = require('./controllers/items');
  app.get('/api/:userId/items', auth.ensureAuthenticated, items.show);
  app.post('/api/:userId/items', auth.ensureAuthenticated, items.create);
  app.del('/api/:userId/items', auth.ensureAuthenticated, items.destroy);


  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  var index = require('./controllers/index');
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};