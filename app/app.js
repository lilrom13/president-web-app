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

angular.module('myApp', ['ngRoute', 'myApp.home']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
    .otherwise({redirectTo: '/templates/home/home.html'});
}]);

