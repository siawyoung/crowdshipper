'use strict';

angular.module('crowdshipperApp')
	.factory('Auth', ['$location', '$rootScope', '$cookieStore', '$resource', function Auth($location, $rootScope, $cookieStore, $resource) {
		// Don't forget to add Session back to function argument
		$rootScope.currentUser = $cookieStore.get('user') || null;
		$cookieStore.remove('user'); // Need to investigate why need to remove('user')

		return {

			createUser: function(user, callback) {
				var cb = callback || angular.noop;
				$resource('/auth/users/register').save({
					username: user.username,
					email: user.email,
					password: user.password
				},
				function(user) { // TODO: Abtracting $resource out to separate factory or use Restangular
					$rootScope.currentUser = user;
					return cb();
				},
				function(err) {
					return cb(err.data);
				});
			},

			checkSession: function() {
				$resource('/auth/session/').get(function(user) {
					$rootScope.currentUser = user;
				});
			},

			addSession: function(user, callback) {
				var cb = callback || angular.noop;
				$resource('/auth/session/').save(user
					// {username:user.username, password:user.password}
					, function(user) {
					$rootScope.currentUser = user;
					return cb();
				}, function(err) {
					return cb(err.data);
				});
			},

			removeSession: function(callback) {
				var cb = callback || angular.noop;
				$resource('/auth/session/').delete(function() {
					$rootScope.currentUser = null;
					return cb();
				},
				function(err) {
					return cb(err.data);
				});
			}
		};
	}]);
