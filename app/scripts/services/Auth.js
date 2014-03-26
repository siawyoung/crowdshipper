'use strict';

angular.module('crowdshipperApp')
	.factory('Auth', ['$location', '$rootScope', 'User', '$cookieStore', function Auth($location, $rootScope, User, $cookieStore) {
		// Don't forget to add Session back to function argument
		// $rootScope.currentUser = $cookieStore.get('user') || null;
		// $cookieStore.remove('user'); Need to investigate why need to remove('user')

		return {

			createUser: function(userinfo, callback) {
				var cb = callback || angular.noop;
				// It's in JSON here
				// if(typeof userinfo ==='object') {
				// 	console.log('The registration was in JSON');
				// } else {
				// 	console.log('It\'s not!');
				// }
				User.save(userinfo, function(user) {
					$rootScope.currentUser = user;
					return cb();
				},
				function(err) {
					return cb(err.data);
				});
			}
		};
	}]);