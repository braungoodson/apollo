'use strict';

angular.module('apolloApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bots', {
        url: '/bots',
        templateUrl: 'app/bots/bots.html',
        controller: 'BotsCtrl'
      });
  });