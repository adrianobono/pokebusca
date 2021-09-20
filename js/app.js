/**
 * @type {angular.Module}
 */

angular = require('angular');
require('angular-route');
require('../dist/templateCachePartials');

angular.module('poke', ['ngRoute','todoPartials'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'PokeCtrl',
			templateUrl: '/partials/pokemon.html',
			scope: {
				totalItems: "=",
				displayItems: '=',
				pagingSize: '=',
				itemPerPage: '=noofitem'
			  },
		    resolve: {
				pokeList: ['pokeBusca', function (pokeBusca) {
					return pokeBusca
				}]
			 }
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});

require('pokeCtrl');
require('pokeBusca');
// require('todoStorage');
// require('todoFocus');
// require('todoEscape');
// require('footer');
