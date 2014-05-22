'use strict';

angular.module('countdownApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
