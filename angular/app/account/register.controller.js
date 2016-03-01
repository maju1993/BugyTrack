'use strict';

angular.module('myApp.register', ['ngAnimate'])
.controller('RegisterCtrl',['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {
    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    $scope.register = function () {

        authService.saveRegistration($scope.registration).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer();
            },
            function (response) {
                $scope.message = "Failed to register user due to:" + response;
            });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }

}]);