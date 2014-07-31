'use strict';

angular.module('countdownApp')
  .controller('MainCtrl', function ($scope, Auth, $http, socket) {
    $scope.awesomeThings = [];
    $scope.events = [];
    $scope.newEvent = {
      name: '',
      date: undefined
    };

    $scope.isLoggedIn = function() {
      return Auth.isLoggedIn();
    };

    /**
     * Things
     */
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    /**
     * Events
     */
    $http.get('/api/events').success(function(events) {
      $scope.events = events;
      socket.syncUpdates('event', $scope.events);
    });

    $scope.addEvent = function() {
      if($scope.newEvent.name === '' || $scope.newEvent.date === undefined) {
        return;
      }
      $http.post('/api/events', $scope.newEvent);
      $scope.newEvent = {
        name: '',
        date: undefined
      };
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $scope.datepicker = {
      format: 'longDate',
      minDate: tomorrow, // restrict to future dates
      dateOptions: {
        showWeeks: false
      },
      open: function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      }
    };

    /*
    $scope.deleteEvent = function(event) {
      $http.delete('/api/events/' + event._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('event');
    });
     */
  });