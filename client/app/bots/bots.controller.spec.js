'use strict';

describe('Controller: BotsCtrl', function () {

  // load the controller's module
  beforeEach(module('apolloApp'));

  var BotsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BotsCtrl = $controller('BotsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
