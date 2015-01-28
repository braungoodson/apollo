'use strict';

angular.module('apolloApp')
  .controller('BotsCtrl', function ($scope,$http,socket,$timeout) {
    $scope.options = {
      animation: false
    };
    $scope.bots = [];
    $scope.tbot = {
      keyValid: true,
      secretValid: true
    };
    $scope.create = function() {
      if (typeof $scope.tbot.key === 'undefined' || $scope.tbot.key === '') {
        $scope.tbot.keyValid = false;
      } else {
        $scope.tbot.keyValid = true;
      }
      if (typeof $scope.tbot.secret === 'undefined' || $scope.tbot.secret === '') {
        $scope.tbot.secretValid = false;
      } else {
        $scope.tbot.secretValid = true;
      }
      if ($scope.tbot.keyValid && $scope.tbot.secretValid) {
        $http.post('/api/bots',{
          key: $scope.tbot.key,
          secret: $scope.tbot.secret
        });
      }
    };
    $http.get('/api/bots')
      .success(function(bots){
        $scope.bots = bots;
        socket.syncUpdates('bot',$scope.bots);
        buildCharts();
      })
      .error(function(e){throw new Error(e);})
    ;
    $scope.$on('destroy',function(){
      socket.unsyncUpdates('bot');
    });
    /*$timeout(function(){
      if ($scope.bots.length > 0) {
        $http
          .put('/api/bots/'+$scope.bots[0]._id,{
            funds: [{
              usd:Math.random(),
              btc:Math.random(),
              dob:new Date()
            }]
          })
          .success(function(bot){
            $scope.bots[0] = bot;
            buildCharts();
          })
          .error(function(e){throw new Error(e);})
        ;
      }
    },2000);*/
    function buildCharts() {
        for (var i = 1; i <= $scope.bots.length; i++) {
          $scope.bots[i-1].data = [[0,1],[0,1]];
          $scope.bots[i-1].labels = [0,0];
          $scope.bots[i-1].series = ['USD','BTC'];
          for (var j = 1; j <= $scope.bots[i-1].funds.length; j++) {
            $scope.bots[i-1].data[0].push($scope.bots[i-1].funds[j-1].usd);
            $scope.bots[i-1].data[1].push($scope.bots[i-1].funds[j-1].btc);
            $scope.bots[i-1].labels.push($scope.bots[i-1].funds[j-1].dob);
          }
        }
    }
  });
