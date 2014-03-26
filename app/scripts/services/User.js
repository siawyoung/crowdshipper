'use strict';

angular.module('crowdshipperApp')
  .factory('User', ['$resource', function ($resource) {
    return $resource('/auth/users/:id/', {},
      {
        'update': {
          method:'PUT'
        }
      });
  }]);