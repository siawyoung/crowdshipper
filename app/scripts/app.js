'use strict';

angular.module('crowdshipperApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  'restangular'
])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/index',
        controller: 'IndexController'
      })
      .when('/:username', {
        templateUrl: 'partials/loggedin',
        controller: 'IndexController'
      })
      // .when('/loggedin', {
      //   templateUrl: 'partials/loggedin',
      //   controller: 'IndexController'
      // })
      .when('/profile', {
        templateUrl: 'partials/profile',
        controller: 'IndexController'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }])

  .run(['$rootScope', '$location', 'Session', function ($rootScope, $location, Session) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      // if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) === -1 )) {
      //   Session.check();
      // }
      if (!currentUser) {
        Session.check();
      }

      if (currentUser && $location.path() === '/') {
        $location.path('/' + currentUser.username);
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/');
      return false;
    });
  }]);
