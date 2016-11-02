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
  .factory('fireBaseService', ['$firebaseArray', function ($firebaseArray) {
    return {
      storeData: function (data) {
        var ref = firebase.database().ref().child('messages');
        var dataForBind = $firebaseArray(ref);
        dataForBind.$add(data);
      }
    };
  }])
  .controller("FormController", ['$scope', 'fireBaseService', FormController]);

  function FormController ($scope, fireBaseService) {
    $scope.formData = {
      email: '',
      password: ''
    }
    $scope.rules = {
      email: {
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      },
      password: {
        minLength: 7,
        maxLength: 20
      }
    }
    $scope.sendFormData = function () {
      fireBaseService.storeData($scope.formData);
    }
  }
})();
