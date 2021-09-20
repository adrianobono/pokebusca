angular = require('angular');


angular.module('poke')
    .controller('PokeCtrl', function PokeCtrl($http, $scope, $routeParams, $timeout,  pokeList) {
        $scope.find = '';
        $scope.pager = {};
        $scope.pagingSize = window.innerWidth < 600 ? $scope.pagingSize || 6 : $scope.pagingSize || 10;
        $scope.itemPerPage = window.innerWidth < 600 ? $scope.pagingSize || 5 : $scope.pagingSize || 10;

        $scope.piked = {};

        var pokemons = pokeList.data.results;

        $scope.totalItems = pokeList.data.results;

        function setPager(itemCount, currentPage, itemPerPage) {
            currentPage = currentPage || 1;
            var startPage, endPage;

            var totalPages = Math.ceil(itemCount / itemPerPage);
            if (totalPages <= $scope.pagingSize) {
                startPage = 1;
                endPage = totalPages;
            } else {
                if (currentPage + 1 >= totalPages) {
                    startPage = totalPages - ($scope.pagingSize - 1);
                    endPage = totalPages;
                } else {
                    startPage = currentPage - parseInt($scope.pagingSize / 2);
                    startPage = startPage <= 0 ? 1 : startPage;
                    endPage = (startPage + $scope.pagingSize - 1) <= totalPages ? (startPage + $scope.pagingSize - 1) : totalPages;
                    if (totalPages === endPage) {
                        startPage = endPage - $scope.pagingSize + 1;
                    }
                }
            }

            var startIndex = (currentPage - 1) * itemPerPage;
            var endIndex = startIndex + itemPerPage - 1;

            var index = startPage;
            var pages = [];
            for (; index < endPage + 1; index++)
                pages.push(index);

            $scope.pager.currentPage = currentPage;
            $scope.pager.totalPages = totalPages;
            $scope.pager.startPage = startPage;
            $scope.pager.endPage = endPage;
            $scope.pager.startIndex = startIndex;
            $scope.pager.endIndex = endIndex;
            $scope.pager.pages = pages;
        }

        $scope.setPage = function (currentPage) {
            if (currentPage < 1 || currentPage > $scope.pager.totalPages)
                return;

            setPager($scope.totalItems.length, currentPage, $scope.itemPerPage);
            $scope.displayItems = $scope.totalItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        };

        $scope.setPage(1);

        function PagerController($scope) {
            $scope.pagingSize = 5;
            $scope.dataPerPage = 10;
            $scope.totalItems = [];

            for (var i = 1; i <= pokeList.length; i++)
                $scope.totalItems.push(i);

            $scope.displayItems = [];
        }

        $scope.onModal = function (show, url) {
            if (url != '') {
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    $scope.piked.name = response.data.name;
                    $scope.piked.exp = response.data.base_experience;
                    $scope.piked.img = response.data.sprites.other.dream_world.front_default;
                    console.log($scope.piked)
                    
                }, function errorCallback(err) {
                    console.log(err)
                });
                
            }
            setTimeout(function() {
                var el = document.getElementById('modal');
                show == true ? el.style.display = 'block' : el.style.display = '';
            }, 500);
           
        }

        $scope.$watch('pokemons', function () {
            $scope.pokemons = pokemons;
        });
    })
    .filter('captalize', function () {
        return function (input) {
            return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
        }
    })