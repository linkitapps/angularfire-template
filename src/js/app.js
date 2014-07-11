angular.module('app', ['ngRoute','ui.bootstrap']);

angular.module('app').constant('APP_CONFIG', {
  baseUrl: '/databases/',
  name: 'Angualr Fire'
});

angular.module('app').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo:'/main'
    })
    .when('/main', {
      templateUrl: 'partials/main.tpl.html',
      controller: 'MainCtrl'
    })
    .when('/404', {
      templateUrl: 'partials/404.tpl.html',
    })
    .otherwise({redirectTo:'/main'});
}]);

angular.module('app').controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

  init();

  function init() {
    $http
    .get('data/carousel.json')
    .success(
      function(data) {
        $scope.carouselList = data.data;
    });
  }

}]);


// angular.module('app').controller('AppCtrl', ['$scope', 'i18nNotifications', 'localizedMessages', function($scope, i18nNotifications) {

//   $scope.notifications = i18nNotifications;

//   $scope.removeNotification = function (notification) {
//     i18nNotifications.remove(notification);
//   };

//   $scope.$on('$routeChangeError', function(event, current, previous, rejection){
//     i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
//   });
// }]);