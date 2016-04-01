'use strict';

angular.module('myApp.login', ['ngAnimate'])
.controller('LoginCtrl',['$scope','$state', '$stateParams', '$log', 'authService', function($scope, $state, $stateParams, $log, authService) {

    $scope.loginData = {
        email: "",
        password: ""
    };
    $scope.loginFailed = false;
    $scope.loginFailedMessage = "Niepoprawny login lub hasło";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {
                if(response.success){
                    $state.go('bugs');
                }
                $scope.loginFailed=true;
            },
            function (err) {
                $scope.loginFailed=true;
            });
    };
}]);