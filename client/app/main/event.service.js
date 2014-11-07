'use strict';

angular
  .module('countdownApp')
  .factory('EventService', function ($http) {
    function getList() {
      return $http.get('/api/events').then(function(response) {
        return response.data;
      });
    }

    function create(event) {
      return $http.post('/api/events', event).then(function(response) {
        return response.data;
      });
    }

    return {
      create: create,
      getList: getList
    };
  });
