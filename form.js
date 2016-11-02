(function () {
  'use strict';

  angular.module('Form.config', [])
  .constant('apiKey', 'AIzaSyCaLfRuTpxCF1G5VyqbKQaTRvXgvElrv7A')
  .constant('databaseUrl', 'https://test-task-737e1.firebaseio.com/')
  .run(['apiKey', 'databaseUrl', function (apiKey, databaseUrl) {
      firebase.initializeApp(apiKey, databaseUrl);
    }]
  );

  angular.module('Form', ['Form.config', 'firebase'])
  // .constant('apiKey', 'AIzaSyCaLfRuTpxCF1G5VyqbKQaTRvXgvElrv7A')
  // .constant('databaseUrl', 'https://test-task-737e1.firebaseio.com/')
  // .run('apiKey', 'databaseUrl', [function (apiKey, databaseUrl) {
  //     firebase.initializeApp(apiKey, databaseUrl);
  // }])
  .factory('FireBaseService', [
    function () {
      return {
        // initApp: function (apiKey, databaseURL) {
        //   var config = {
        //     apiKey: apiKey,
        //     databaseURL: databaseURL
        //   };
        //   firebase.initializeApp(config);
        // },
        storeData: function (data) {
          var ref = firebase.database().ref().child('messages');
          ref.set(data);
        }
      };
    }
  ])
  .controller("FormController", ['$scope', '$firebase', 'apiKey', 'databaseUrl', '$firebaseObject', 'FireBaseService', FormController]);

  function FormController ($scope, $firebase, apiKey, databaseUrl, $firebaseObject, FireBaseService) {
    $scope.formData = {
      email: '',
      password: ''
    }
    // FireBaseService.initApp(apiKey, databaseURL);
    // var ref = firebase.database().ref().child('messages');

    $scope.sendFormData = function () {
      FireBaseService.storeData($scope.formData);
    }
  }
})();
