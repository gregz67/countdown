'use strict';

describe('EventService', function() {
  beforeEach(module('countdownApp'));

  var EventService, $httpBackend;

  beforeEach(inject(function (_$httpBackend_, _EventService_) {
    EventService = _EventService_;
    $httpBackend = _$httpBackend_;
  }));

  describe('create', function() {
    it('POSTs to the events endpoint', function() {
      $httpBackend
        .expectPOST('/api/events', {name: 'Christmas', date: '2014-12-25'})
        .respond({_id: '123', name: 'Christmas', date: '2014-12-25'});

      EventService.create({name: 'Christmas', date: '2014-12-25'}).then(function(response) {
        expect(response).toEqual({_id: '123', name: 'Christmas', date: '2014-12-25'});
      });

      $httpBackend.flush();
    });
  });

  describe('getList', function () {
    it('GETs events', function() {
      $httpBackend
        .expectGET('/api/events')
        .respond([{_id: '123', name: 'Christmas', date: '2014-12-25'}]);

      EventService.getList().then(function(response) {
        expect(response).toEqual([{_id: '123', name: 'Christmas', date: '2014-12-25'}]);
      });

      $httpBackend.flush();
    });
  });

});
