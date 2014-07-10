'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('countdownApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    $httpBackend.expectGET('/api/events')
      .respond([
        {
          name: 'Christmas',
          date: new Date(2014, 12, 25, 0, 0, 0, 0)
        },
        {
          name: 'New Year\'s',
          date: new Date(2015, 1, 1, 0, 0, 0, 0)
        }
      ]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });

  it('should attach a list of events to the scope', function () {
    $httpBackend.flush();
    expect(scope.events.length).toBe(2);
  });
});
