'use strict';

angular.module('crowdshipperApp')
	.controller('LogInOutController', ['$scope', 'Session', '$location', function($scope, Session, $location) {

		$scope.login = function(form) {
			Session.add({
				username: $scope.existingUser.username,
				password: $scope.existingUser.password
			},
			function(err) { //TODO: Possibly abstracting this error callback function into its own factory
				$scope.errors = {};
				if (!err) {
					$location.path('/' + $scope.existingUser.username);
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
			Session.remove(function(err) {
				if (!err) {
					$location.path('/');
				}
			});
		};
	}]);
