'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('countdownApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/awesomeThings')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    $httpBackend.expectGET('/api/events').respond([ 'Christmas', 'New Years' ]);
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings).toBeUndefined();
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });

  it('should attach a list of events to the scope', function () {
    expect(scope.events).toBeUndefined();
    $httpBackend.flush();
    expect(scope.events.length).toBe(2);
  });

});
