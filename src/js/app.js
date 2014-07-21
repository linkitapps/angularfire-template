angular.module('app', ['app.config', 'app.routers', 'app.controllers', 'app.services'])

  .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
    if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
      // double-check that the app has been configured
      angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      setTimeout(function() {
         angular.element(document.body).removeClass('hide');
      }, 250);
    }
    else {
      // establish authentication
      $rootScope.auth = loginService.init('/login');
      console.log($rootScope.auth);
      $rootScope.FBURL = FBURL;
    }
  }]);
