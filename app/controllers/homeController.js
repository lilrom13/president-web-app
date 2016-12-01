/**
 * Created by romain on 2016-11-27.
 */

home.controller('homeController', function($scope, $routeParams, $http, $window) {
    console.log("homeController")

    $http({
        method: 'GET',
        url: 'http://192.168.0.38:3000/parts'
    }).then(function successCallback(response) {
        $scope.parts = response.data

        console.log(response.data)
    }, function errorCallback(response) {
        console.log(response)
    });

    $scope.goToPart = function(id) {
        $window.location.href = '/parts.html#!/'+id;
    }

    $scope.goToPartCreation = function() {
        $window.location.href = '/parts.html#!/';
    }
});