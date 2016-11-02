(function () {
  'use strict';
  angular.module('form', ['firebase'])
  .constant('CONFIG', {
    apiKey: 'AIzaSyCaLfRuTpxCF1G5VyqbKQaTRvXgvElrv7A',
    databaseURL: 'https://test-task-737e1.firebaseio.com/'
  })
  .run(['CONFIG', function (CONFIG) {
    firebase.initializeApp(CONFIG);
  }])
  .factory('fireBaseService', ['$firebase', function ($firebase) {
    return {
      storeData: function (data) {
        var ref = firebase.database().ref().child('messages');
        ref.set(data);
      }
    };
  }])
  .controller("FormController", ['$scope', 'fireBaseService', FormController]);

  function FormController ($scope, fireBaseService) {
    $scope.formData = {
      email: '',
      password: ''
    }
    $scope.sendFormData = function () {
      fireBaseService.storeData($scope.formData);
    }
  }
})();
