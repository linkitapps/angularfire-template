angular.module('app.config', [])
  .constant('APP_CONFIG', {
    baseUrl: '/databases/',
    name: 'VisuIt'
  })

  .constant('APP_URL', {
    'SIGN_IN'  : '#/sign-in',
    'SIGN_OUT' : '#/sign-out'
  })

  .constant('FBURL', 'https://gim-bluelay.firebaseio.com');
