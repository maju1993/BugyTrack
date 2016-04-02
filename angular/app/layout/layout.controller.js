'use strict';

angular.module('myApp.layoutCtrl', ['ngAnimate'])
.controller('layoutCtrl',['$scope','$state', '$stateParams', '$log', 'authService', function($scope, $state, $stateParams, $log, authService) {
    //$scope.isAuth = authService.authentication.isAuth;
    $scope.firstName = "Piotr";
    
    $scope.$watch(
        function () { 
            return authService.authentication.isAuth; 
        },
        function (value) {
            $scope.isAuth = value;
        }
    );
}]);