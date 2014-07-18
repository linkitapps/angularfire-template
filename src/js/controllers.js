angular.module('app.controllers', ['ui.bootstrap','firebase'])
.controller('MainCtrl', ['$scope', '$http', '$firebase', function($scope, $http, $firebase) {

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

  function loadMoviewData() {
    // var movieRef = new Firebase("https://imdb-top-250.firebaseio.com/movieList");
    // Automatically syncs everywhere in realtime
    //$scope.moviewList = $firebase(movieRef);
    // console.log($firebase(movieRef));
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

.controller('SignInCtrl', ['$scope', function($scope) {

}])

.controller('D3Ctrl', ['$scope', function($scope) {
var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

d3.json("/data/flare.json", function(error, root) {
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");

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