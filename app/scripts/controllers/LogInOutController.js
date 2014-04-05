'use strict';

angular.module('crowdshipperApp')
	.controller('LogInOutController', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {

		$scope.login = function(form) {
			Auth.addSession({
				username: $scope.existingUser.username,
				password: $scope.existingUser.password
			},
			function(err) {
				$scope.errors = {};
				if (!err) {
					$location.path('/');
				} else {
					// TODO Use Angular native form validation
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
