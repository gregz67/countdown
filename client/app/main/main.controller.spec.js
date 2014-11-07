'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('countdownApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
    $scope,
    $q,
    Auth,
    EventService,
    eventsDeferred;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($rootScope, _$q_, $controller, _Auth_, _EventService_) {
    $scope = $rootScope.$new();
    $q = _$q_;
    Auth = _Auth_;
    EventService = _EventService_;

    spyOn(Auth, 'isLoggedIn').and.returnValue(true);

    eventsDeferred = $q.defer();
    spyOn(EventService, 'getList').and.returnValue(eventsDeferred.promise);

    MainCtrl = $controller('MainCtrl', {
      $scope: $scope,
      EventService: EventService
    });
  }));

  it('gets the lists of events and puts it on scope', function() {
    eventsDeferred.resolve([{_id: '123', name: 'Christmas', date: '2014-12-25'}]);
    $scope.$apply();

    expect($scope.events).toEqual([{_id: '123', name: 'Christmas', date: '2014-12-25'}]);
  });

  describe('addEvent', function() {
    it('delegates to the event service', function() {
      var createDeferred = $q.defer();
      spyOn(EventService, 'create').and.returnValue(createDeferred.promise);

      $scope.addEvent({name: 'Christmas', date: '2014-12-25'});
      expect(EventService.create).toHaveBeenCalledWith({name: 'Christmas', date: '2014-12-25'});

      createDeferred.resolve({name: 'Christmas', date: '2014-12-25'});
      $scope.$apply();
    });
  });
});
