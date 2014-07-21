angular.module('app.controllers', ['ui.bootstrap', 'firebase', 'app.services'])

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  init();
  function init() {
    loadCarouselData();
  }
  function loadCarouselData() {
    $http
    .get('data/carousel.json')
    .success(
      function(data) {
        $scope.carouselList = data.data;
    });
  }
}])

.controller('ModalInstanceCtrl', ['$scope', function($scope) {
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
}])

.controller('MovieCtrl', ['$scope','$modal','$http','$log', 'ModalInstanceCtrl', function($scope, $modal, $http, $log, ModalInstanceCtrl) {
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


}])

.controller('HeaderCtrl', ['$scope', '$firebase', '$firebaseSimpleLogin', function ($scope, $firebase, $firebaseSimpleLogin) {
  var ref = new Firebase("https://gim-bluelay.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
}])

/*
{
  "id":"113636980213637111257",
  "uid":"google:113636980213637111257",
  "displayName":"YoungPhil Gim",
  "provider":"google",
  "thirdPartyUserData":
  {
    "id":"113636980213637111257",
    "email":"youngphil.gim@gmail.com",
    "verified_email":true,
    "name":"YoungPhil Gim",
    "given_name":"YoungPhil",
    "family_name":"Gim",
    "link":"https://plus.google.com/113636980213637111257",
    "picture":"https://lh3.googleusercontent.com/-caKk0SdNW-Y/AAAAAAAAAAI/AAAAAAAAADQ/LtOG4ZHCA4o/photo.jpg",
    "gender":"male",
    "locale":"ko"
  },
  "accessToken":"ya29.QwCsB6ypge-E0hsAAAD9JXOqoChSZZC2gmiSzm9d7D0FpWrjDnaLIf-tdPr2AA",
  "email":"youngphil.gim@gmail.com",
  "firebaseAuthToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MDU0ODY3NjgsInYiOjAsImQiOnsiaWQiOiIxMTM2MzY5ODAyMTM2MzcxMTEyNTciLCJ1aWQiOiJnb29nbGU6MTEzNjM2OTgwMjEzNjM3MTExMjU3IiwicHJvdmlkZXIiOiJnb29nbGUiLCJlbWFpbCI6InlvdW5ncGhpbC5naW1AZ21haWwuY29tIn0sImlhdCI6MTQwNTQwMDM2N30.zO21U3PGt5UpdNonj109sqpZ_ovyTwI_30mRz62KMKI"
}
*/

.controller('LoginCtrl', ['$scope', '$firebase', '$firebaseSimpleLogin', function($scope, $firebase, $firebaseSimpleLogin) {
  var chatRef = new Firebase('https://gim-bluelay.firebaseio.com');
  // var userRef = new Firebase('https://gim-bluelay.firebaseio.com/users');
  // $scope.people = $firebase(userRef);

  var auth = FirebaseSimpleLogin(chatRef, function(error, user) {
    if (!error) {
      $scope.user = user;
    } else {
      $scope.error = error;
    }
  });

  $scope.auth = auth;

  $scope.create = function(email, password) {
    auth.createUser(email, password, function(error, user) {
      if (!error) {
        console.log('User Id: ' + user.uid + ', Email: ' + user.email);
        // var uid = [user.uid];
        // $scope.people.$add({
        //   uid[0] : {
        //     email:email,
        //     password:password
        //   }
        // });
        var userRef = new Firebase('https://gim-bluelay.firebaseio.com/users/' + user.uid);
        $scope.people = $firebase(userRef);
        $scope.people.$set(user);
      }
    });
  };

  $scope.login = function(email, password) {
    auth.login('password', {
      email: email,
      password: password
    });
  };
}])

.controller('SignInCtrl', ['$scope', 'FireService', function($scope, FireService) {
//ng-click="auth.$login('google')"
  $scope.userLogin = function() {
    // FireService.loginPassword($scope.user);
    console.log($scope.user);
    console.log(FireService.loginPassword($scope.user));
  };
}])

