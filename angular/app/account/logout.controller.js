'use strict';

angular.module('myApp.logout',[])
.controller('LogoutCtrl',['$state', 'authService', function($state, authService) {
    authService.logOut();
    $state.go('master.login');
}]);