angular.module('app.service.login', ['firebase', 'app.service.firebase'])

  .factory('loginService', ['$rootScope', '$firebaseSimpleLogin', 'firebaseRef', '$timeout', function($rootScope, $firebaseSimpleLogin, firebaseRef, $timeout) {
    var auth = null;
    return {
      init: function() {
        return auth = $firebaseSimpleLogin(firebaseRef());
      },
    }
    function assertAuth() {
      if( auth === null ) { throw new Error('Must call loginService.init() before using its methods'); }
    }
  }]);