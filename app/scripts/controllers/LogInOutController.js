'use strict';

angular.module('crowdshipperApp')
	.controller('LogInOutController', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {

		$scope.login = function(form) {
			Auth.addSession({
				email: $scope.existingUser.email,
				password: $scope.existingUser.password
			},
			function(err) {
				$scope.errors = {};
				if (!err) {
					$location.path('/');
				} else {
					// To modify and hangle differently
					angular.forEach(err.errors, function(error, field) {
							form[field].$setValidity('mongoose', false);
							$scope.errors[field] = error.type;
						});
				}
			});
		};
		
		$scope.logout = function() {
			Auth.removeSession(function(err) {
				if (!err) {
					$location.path('/');
				}
			});
		};
	}]);
