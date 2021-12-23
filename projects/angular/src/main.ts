import * as angular from 'angular'

angular.module('app', []).controller('mainController', [
  '$scope',
  ($scope) => {
    $scope.name = 'Angular'
    $scope.greeting = 'This is my first Angular App!'
  },
])
