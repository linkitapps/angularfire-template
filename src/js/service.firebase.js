angular.module('app.service.firebase', ['firebase'])

// a simple utility to create references to Firebase paths
   .factory('firebaseRef', ['Firebase', 'FBURL', function(Firebase, FBURL) {
      /**
       * @function
       * @name firebaseRef
       * @param {String|Array...} path
       * @return a Firebase instance
       */
      return function(path) {
        console.log(arguments);
        return new Firebase(pathRef([FBURL].concat(Array.prototype.slice.call(arguments))));
      }
   }])


.factory('FireService', ['$firebase', '$firebaseSimpleLogin', function($firebase, $firebaseSimpleLogin) {

  var ref = new Firebase("https://gim-bluelay.firebaseio.com/");
  var auth = $firebaseSimpleLogin(ref);

  return {
      loginPassword: function(data) {
        console.log(data);
        console.log(auth);
        auth.$login('password', {
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe
        });
      }
  };
}]);

function pathRef(args) {
  console.log(args);
   for(var i=0; i < args.length; i++) {
      if( typeof(args[i]) === 'object' ) {
         args[i] = pathRef(args[i]);
      }
   }
   var result = args.join('/');
   console.log(result);
   return result;
}