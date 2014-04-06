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
      .when('/:username/profile', {
        templateUrl: 'partials/profile',
        controller: 'IndexController'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }])

  .run(['$rootScope', '$location', 'Session', function ($rootScope, $location, Session) {

    //watching the value of the currentUser variable. If currentUser is not populated and user is on anywhere else but the front page, check session.
    // If currentUser tries to go to the front page when logged in, it will redirect him to his home page.

    $rootScope.$watch('currentUser', function(currentUser) {

      if (!currentUser && $location.path() !== '/') {
        Session.check();
      }

      if (currentUser && $location.path() === '/') {
        $location.path('/' + currentUser.username);
      }
    });


    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function(event) {
      event.preventDefault();
      $location.path('/');
      return false;
    });
  }]);
