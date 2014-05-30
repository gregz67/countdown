'use strict';

angular.module('countdownApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $http.get('/api/events').success(function(events) {
      $scope.events = events.map(function(event) {
        return new Date(event);
      });
    });
  });
