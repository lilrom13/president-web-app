/**
 * Created by romain on 2016-11-29.
 */

parts.controller('partController', function($scope, $routeParams, $http, $route, $location, $window) {
    console.log("partController")

    $http({
        method: 'GET',
        url: 'http://192.168.0.38:3000/parts/'+$routeParams.id
    }).then(function successCallback(response) {
        $scope.part = response.data
    }, function errorCallback(response) {
        console.log(response)
    });

    $scope.saveRound = function() {
        console.log("saveInformations")

        if ($scope.pres != null && $scope.vicePres != null
            && $scope.viceTrouDuc != null && $scope.trouDuc != null) {
            var duplicate = false

            var result = [$scope.pres, $scope.vicePres, $scope.viceTrouDuc, $scope.trouDuc]

            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (i != j) {
                        if (result[i] == result[j])
                            duplicate = true
                    }
                }
            }

            if (!duplicate) {
                $http.post('http://192.168.0.38:3000/parts/'+$routeParams.id, {'result': result}).then(
                    function successCallback() {
                        $route.reload()
                    },
                    function errorCallback(response) {
                        console.log("error: " + response.data)
                    }
                );
            } else {
                Materialize.toast('Résultat invalide', 4000)
            }
        }
    }

    $scope.goToResults = function() {
        $location.path($routeParams.id+'/results')
    }

    // $scope.deletePart = function () {
    //     $http({
    //         method: 'DELETE',
    //         url: 'http://192.168.0.38:3000/parts/'+$routeParams.id
    //     }).then(function successCallback() {
    //         $window.location.href = '/index.html#!/';
    //     }, function errorCallback(response) {
    //         console.log(response)
    //     });
    // }
});

parts.controller('partsController', function($scope, $routeParams, $http, $window) {
    console.log("partsController")

    $scope.playersNames = []
    $scope.presidentValue = 0
    $scope.vicePresidentValue = 0
    $scope.viceTrouDucValue = 0
    $scope.trouDucValue = 0


    $scope.addPlayer = function() {
        console.log("add player")
        var playerName = $scope.playerName

        if (playerName != null && playerName != "") {
            if ($scope.playersNames.length != 4) {
                $scope.playersNames.push(playerName)
                $scope.playerName = null
            } else {
                Materialize.toast('Nombre de joueur max atteint', 4000)
            }
        }
    }

    $scope.removePlayer = function(index) {
        console.log("remove player")
        $scope.playersNames.splice(index, 1)
    }

    $scope.savePart = function() {
        var name = $scope.name
        var scoresValues = [parseInt($scope.presidentValue), parseInt($scope.vicePresidentValue),
            parseInt($scope.viceTrouDucValue), parseInt($scope.trouDucValue)];
        var playersNames = $scope.playersNames
        var error = false

        if (name == null || name == "") {
            Materialize.toast('Nom de la partie invalide', 4000)
            error = true
        } if (playersNames.length != 4) {
            Materialize.toast('Nombre de joueur incorrect', 4000)
            error = true
        }

        if (!error) {
            $http.post('http://192.168.0.38:3000/parts/', {'name': name,
                'playersNames': playersNames, 'scoresValues': scoresValues}).then(
                function successCallback() {
                    $window.location.href = '/index.html#!/';
                },
                function errorCallback(response) {
                    console.log("error: " + response.data)
                }
            );
        }
    }
});

parts.controller('resultsController', function($scope, $routeParams, $http) {
    console.log("resultsController")

    $http({
        method: 'GET',
        url: 'http://192.168.0.38:3000/parts/'+$routeParams.id
    }).then(function successCallback(response) {
        $scope.part = response.data
    }, function errorCallback(response) {
        console.log(response)
    });
});