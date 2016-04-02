'use strict';

angular.module('myApp.project-list', ['ngAnimate', 'ui.bootstrap', 'ui.router'])
    .controller('ProjectListCtrl', ['$scope', 'projectService', function($scope, projectService) {
        
        init();
        
        function init(){
           projectService.getProjects().then(function(response) {
               console.log(response);
               $scope.projects = response.data;
           });
        }
        
    }]);