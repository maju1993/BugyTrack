'use strict';

angular.module('myApp.create-project', ['ngAnimate', 'ui.bootstrap', 'ui.router'])
    .controller('CreateProjectCtrl', ['$scope', '$stateParams', 'projectService', function($scope, $stateParams, projectService) {
        $scope.create = _create;
        $scope.getMilestones = _getMilestones;
        $scope.project = {};
        $scope.project.defaultMileStone="";
        
        function _create(){
            console.log($scope.project);
        }
       
        function _getMilestones(search) {
            var milestones=['1.0','1.1','1.2','2.0','3.0','3.1'];
            var newMilestones = milestones.slice();
            if (search && newMilestones.indexOf(search) === -1) {
                newMilestones.unshift(search);
            }
            return newMilestones;
        }
}]);