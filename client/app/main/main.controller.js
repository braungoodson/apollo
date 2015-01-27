'use strict';

angular.module('apolloApp')
  .controller('MainCtrl', function ($scope, $http, socket, $interval) {
    $scope.options = {
      animation: false
    };
  //$scope.labels = [new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime()];
  $scope.labels = [];
  $scope.series = ['Series A', 'Series B'];
  /*$scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];*/
  $scope.data = [[],[]];
  for (var i = 15; i >= 0; --i) {
    $scope.labels.push(0);
    $scope.data[0].push(0);
    $scope.data[1].push(0);
  }

  $scope.interval = $interval(function(){
    $scope.labels.shift();
    $scope.labels.push(new Date().toString().substr(16,8));
    $scope.data[0].shift();
    $scope.data[0].push(Math.floor(Math.random()*100));
    $scope.data[1].shift();
    $scope.data[1].push(Math.floor(Math.random()*100));
  },500);
  
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      $interval.cancel($scope.interval);
    });
  });
