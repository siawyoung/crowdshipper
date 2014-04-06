'use strict';

angular.module('crowdshipperApp')
  .directive('userCheck', [function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'scripts/directives/usercheck.html'
    };
  }]);
