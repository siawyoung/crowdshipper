'use strict';

angular.module('crowdshipperApp')
  .factory('Session', ['$location', '$rootScope', '$cookieStore', '$resource', 'Restangular', function($location, $rootScope, $cookieStore, $resource, Restangular) {
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user'); // Need to investigate why need to remove('user')

    var session = Restangular.one('auth/session/');

    return {

      check: function() {
        session.get().then(function(user) {
          // alert(user);
          $rootScope.currentUser = user;
        });
        // $resource('/auth/session/').get(function(user) {
        //   $rootScope.currentUser = user;
        // });

      },

      // user == {username, password} from LoginOUtController
      // add also takes a callback as an argument for floating errors up
      add: function(user, callback) {
        var cb = callback || angular.noop;
        // $resource('/auth/session/').save(user, function(user) {
        //   $rootScope.currentUser = user;
        //   return cb();
        // }, function(err) {
        //   return cb(err.data);
        // });
        session.post('',user).then(function(user) {
          $rootScope.currentUser = user;
          return cb();
        }, function(err) {
          return cb(err.data);
        });
      },

      // remove takes a callback as an argument for floating errors up
      remove: function(callback) {
        var cb = callback || angular.noop;
        // $resource('/auth/session/').delete(function() {
        //   $rootScope.currentUser = null;
        //   return cb();
        // },
        // function(err) {
        //   return cb(err.data);
        // });
        session.remove().then(function() {
          $rootScope.currentUser = null;
          return cb();
        },
        function(err) {
          return cb(err.data);
        });
      }

    };
  }]);
