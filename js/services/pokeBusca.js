angular = require('angular');

angular.module('poke')
  .factory('pokeBusca', function ($http, $q) {
    var pokeList = [];
    var defer = $q.defer();
    $http({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon?limit=1500'
    }).then(function successCallback(response) {
      pokeList = response.data.results;
      defer.resolve(response);
    }, function errorCallback(err) {
      console.log(err)
    });
    return defer.promise;

  });