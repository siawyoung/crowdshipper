'use strict';

angular.module('crowdshipperApp')
	.controller('IndexController', ['$scope', 'Auth', '$location', function($scope, Auth, $location){
		// Register is a placeholder, to replace with index functionality once front-end work commences
		$scope.register = function(form) {
			Auth.createUser({
				username: $scope.user.username,
				email: $scope.user.email,
				password: $scope.user.password
			},
			function(err) {
				$scope.errors = {};

				if (!err) {
					$location.path('/' + $scope.user.username);
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
