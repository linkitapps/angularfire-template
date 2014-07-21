angular.module('app.routers', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo:'/main'
      })
      .when('/main', {
        templateUrl: 'partials/main.tpl.html',
        controller: 'MainCtrl'
      })
      .when('/movie', {
        templateUrl: 'partials/movie.tpl.html',
        controller: 'MovieCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.tpl.html',
        controller: 'LoginCtrl'
      })
      .when('/sign_in', {
        templateUrl: 'partials/signin.tpl.html',
        controller: 'SignInCtrl'
      })
      .when('/sign_up', {
        templateUrl: 'partials/signup.tpl.html',
        controller: 'SignInCtrl'
      })
      .when('/d3', {
        templateUrl: 'partials/d3.tpl.html',
        controller: 'D3Ctrl'
      })
      .when('/404', {
        templateUrl: 'partials/404.tpl.html',
      })
      .otherwise({redirectTo:'/main'});
  }]);