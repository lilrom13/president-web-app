/**
 * Created by romain on 2016-11-27.
 */

home.controller('homeController', function($scope, $routeParams, $http) {
    console.log("homeController")

    $scope.id = $routeParams.id
});