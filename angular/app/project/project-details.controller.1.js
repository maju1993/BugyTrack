'use strict';

angular.module('myApp.project-details', ['ngAnimate', 'ui.bootstrap', 'ui.router'])
    .controller('ProjectDetailsCtrl', ['$scope', '$stateParams', 'projectService', function($scope, $stateParams, projectService) {
        $scope.id =$stateParams.id;
        
        $scope.project={
            name:'test'
        };
        // init();
        
        // function init(){
        //    projectService.getProjects().then(function(response) {
        //        console.log(response);
        //        $scope.projects = response.data;
        //    });
        // }
        
    }]);