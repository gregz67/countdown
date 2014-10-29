'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('countdownApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('angularMoment'));

  var MainCtrl,
      $scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: $scope
    });
  }));

  it('should do something', function() {

  });
  
  xit('should show user logged in', function() {
    $httpBackend.expectGET('/api/me')
      .respond({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test',
        events: [
          {
            name: 'Christmas',
            date: new Date('12/25/2014')
          }, {
            name: 'New Year\'s',
            date: new Date('01/01/2015')
          }
        ]
      });
//    expect($scope.isLoggedIn).toBe(true);
    $httpBackend.flush();
  });

});
