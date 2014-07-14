angular.module('app', ['ngRoute','ui.bootstrap','firebase']);

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
    .when('/movie', {
      templateUrl: 'partials/movie.tpl.html',
      controller: 'MovieCtrl'
    })
    .when('/404', {
      templateUrl: 'partials/404.tpl.html',
    })
    .otherwise({redirectTo:'/main'});
}]);

angular.module('app').controller('MainCtrl', ['$scope', '$http', '$firebase', function($scope, $http, $firebase) {

  init();

  function init() {
    loadCarouselData();
    loadMoviewData();
  }

  function loadCarouselData() {
    $http
    .get('data/carousel.json')
    .success(
      function(data) {
        $scope.carouselList = data.data;
    });
  }

  function loadMoviewData() {
    var movieRef = new Firebase("https://imdb-top-250.firebaseio.com/movieList");
    // Automatically syncs everywhere in realtime
    //$scope.moviewList = $firebase(movieRef);
    console.log($firebase(movieRef));
  }

}]);

angular.module('app').controller('ModalInstanceCtrl', ['$scope', function($scope) {
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

}]);

angular.module('app').controller('MovieCtrl', ['$scope','$modal','$http','$log', 'ModalInstanceCtrl', function($scope, $modal, $http, $log, ModalInstanceCtrl) {

  var modalInstance

  $scope.open = function (size) {
    modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      scope: $scope,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.ok = function() {
    console.log('ok - close');
    modalInstance.close();
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