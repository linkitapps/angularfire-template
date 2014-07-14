var NotificationsArchive = function() {
  this.name = 'noArchive';
};

  NotificationsArchive.prototype.archive = function() {
    return;
  };

  NotificationsArchive.prototype.setName = function(name) {
    this.name = name;
  }

// var NotificationsService = function() {
//   this.MAX_LEN = 10;
//   this.notificationsArchive = new NotificationsArchive();
//   this.notifications = [];
// };

var NotificationsService = function(notificationsArchive) {
  this.MAX_LEN = 10;
  this.notificationsArchive = notificationsArchive;
  this.notifications = [];
};

  NotificationsService.prototype.push = function(notification) {
    var newLen, notificationToArchive;
    newLen = this.notifications.unshift(notification);
    if ( newLen > MAX_LEN ) {
      notificationToArchive = this.notifications.pop();
      this.notificationsArchive.archive(notificationToArchive);
    }
  };

  NotificationsService.prototype.getCurrent = function() {
    return this.notifications;
  }

var myMod = angular.module('myMod', []);

myMod.value('notificationsArchive', new NotificationsArchive());
myMod.constant('MAX_LEN', 30);

myMod.value('POTAL_VALUE', {
  naver: 'http://www.naver.com/',
  daum: 'http://www.daum.net/'
});

myMod.constant('URL_CONSTANT', {
  angular: 'https://angularjs.org/',
  bootstrap: 'http://getbootstrap.com/',
  brunt: 'http://gruntjs.com/'
});

// myMod.service('notificationsService', NotificationsService);
myMod.service('notificationsService', ['notificationsArchive', NotificationsService]);


myMod.factory('notificatoinsServiceFac', function(notificationsArchive) {
  var MAX_LEN = 10;
  var notifications = [];

  return {
    push: function(notification) {
      var notificationToArchive;
      var newLen = notifications.unshift(notification);


      if ( newLen > MAX_LEN ) {
        notificationToArchive = notifications.pop();
        notificationsArchive.archive(notificationToArchive);
      }
    },

    getCurrent: function() {
      return notifications;
    }
  }
});

myMod.provider('notificationsServicePro', function() {
  var config = {
    maxLen : 10
  };
  var notifications = [];

  return {
    setMaxLen : function(maxLen) {
      config.maxLen = maxLen || config.maxLen;
    },

    $get : function(notificationsArchive) {
      return {
        push:function() {

        }
      };
    }
  };
});

// 설정 단계
myMod.config(function(URL_CONSTANT, notificationsServiceProProvider, MAX_LEN) {
  console.log('========== 설정 단계 시작 ==========');
  console.log(URL_CONSTANT);
  notificationsServiceProProvider.setMaxLen(MAX_LEN);
  console.log(notificationsServiceProProvider);
  console.log('========== 설정 단계 끝 ==========');
});

// 실행 단계
myMod.run(function(POTAL_VALUE, URL_CONSTANT, notificationsService, notificatoinsServiceFac) {
  console.log('========== 실행 단계 시작 ==========');
  console.log(POTAL_VALUE);
  console.log(URL_CONSTANT);
  console.log(notificationsService);
  console.log(notificatoinsServiceFac);
  console.log('========== 실행 단계 끝 ==========');
});

myMod.controller('HelloCtrl', ['$scope', 'notificationsService', function($scope, notificationsService) {
  $scope.name = 'World';

  console.log(notificationsService);
}]);
