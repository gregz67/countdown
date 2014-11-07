'use strict';

angular.module('countdownApp')
  .controller('MainCtrl', function($scope, Auth, EventService, $http, socket) {
    var emptyEvent = {
      name: '',
      date: undefined
    };
    $scope.events = [];
    $scope.newEvent = emptyEvent;

    $scope.isLoggedIn = function() {
      return Auth.isLoggedIn();
    };

    /**
     * Events
     */
    if (Auth.isLoggedIn()) {
      EventService.getList().then(function(events) {
        $scope.events = events;
        socket.syncUpdates('event', $scope.events);
      });
    }

    $scope.addEvent = function(newEvent) {
      if (newEvent.name === '' || newEvent.date === undefined) {
        return;
      }
      EventService.create(newEvent);
      $scope.newEvent = emptyEvent;
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $scope.datepicker = {
      isOpen: false,
      format: 'longDate',
      minDate: tomorrow, // restrict to future dates
      dateOptions: {
        showWeeks: false
      },
      open: function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datepicker.isOpen = true;
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
