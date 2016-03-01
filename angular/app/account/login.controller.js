'use strict';

angular.module('myApp.login', ['ngAnimate'])
.controller('LoginCtrl',['$scope','$state', '$stateParams', '$log', 'authService', function($scope, $state, $stateParams, $log, authService) {

    $scope.loginData = {
        email: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {
                $state.go('bugs');
            },
            function (err) {
                $scope.message = err.error_description;
            });
    };
}]);