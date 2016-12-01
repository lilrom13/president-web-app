/**
 * Created by romain on 2016-11-27.
 */
'use strict';


var home = angular.module('myApp.home', ['ngRoute']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {templateUrl: 'templates/home/home.html',
            controller: 'homeController'})
        .otherwise({redirectTo: '/templates/home/home.html'});
}]);

var parts = angular.module('myApp.parts', ['ngRoute']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {templateUrl: 'templates/parts/parts.html',
            controller: 'partsController'})
        .when('/:id', {templateUrl: 'templates/parts/part.html',
            controller: 'partController'})
        .when('/:id/results', {templateUrl: 'templates/parts/results.html',
            controller: 'resultsController'})
        .when('/:id/statistics.html', {templateUrl: 'templates/parts/statistics.html',
            controller: 'statisticsController'})
}]);



angular.module('myApp', ['ngRoute', 'myApp.home']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
    .otherwise({redirectTo: '/templates/home/home.html'});
}]);

