'use strict';

angular.module('crowdshipperApp')
	.controller('RegisterController', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
		$scope.register = function(form) {
			Auth.createUser({
				email: $scope.newUser.email,
				password: $scope.newUser.password
			},
			function(err) {
				$scope.errors = {};

				if (!err) {
					$location.path('/');
				} else {
					angular.forEach(err.errors, function(error, field) {
						form[field].$setValidity('mongoose', false);
						$scope.errors[field] = error.type;
					});
				}
			}
			);
		};
	}]);
