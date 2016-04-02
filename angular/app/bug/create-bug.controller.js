'use strict';

angular.module('myApp.create-bug', ['ui.router', 'ui.bootstrap'])
    .controller('CreateBugCtrl', ['$scope', '$log','$uibModalInstance', 'projectService',function($scope, $log, $uibModalInstance, projectService) {
        init();

        function init(){
            projectService.getProjects().then(function(response) {
                $scope.products = response.data;
                $scope.bug.product=$scope.products[0];
            });
        };



       $scope.ok = function(){
           $log.info($scope.bug);
           $uibModalInstance.close();
       };

        $scope.cancel=function(){
          $uibModalInstance.dismiss('cancel');
        };

        $scope.bug={};

        $scope.userAvailableForAssigment = [{id:1, name:"Użytkownik 1", avatar_url:"https://s3.amazonaws.com/uifaces/faces/twitter/sauro/128.jpg"}
            ,{id:2, name:"Użytkownik 2", avatar_url:"https://s3.amazonaws.com/uifaces/faces/twitter/jina/128.jpg"}];
        $scope.bug.assigedTo = $scope.userAvailableForAssigment[0];


        $scope.groups =[{id:1, name:"Grupa 1"},{id:2, name:"Grupa 2"}];
        $scope.bug.group=$scope.groups[0];

        $scope.priorities =[{id:1, name:"Niski"},{id:2, name:"Średni"}, {id:3, name:"Wysoki"}];
        $scope.bug.priority=$scope.priorities[0];

        $scope.severities =[{id:1, name:"Niski"},{id:2, name:"Średni"}, {id:3, name:"Wysoki"}];
        $scope.bug.severity=$scope.severities[0];

        $scope.bug.attachments=[];

        $scope.attachmentUploaded = function ($file, $message, $flow ) {
            var returnData=JSON.parse($message);
            $scope.bug.attachments.push({
                name:$file.name,
                url:returnData.url
            });
            console.log($scope.bug.attachments);
            //$log.debug($flow);
            $log.debug($file);
        }

        $scope.removeAttachment = function ($file, $fileIndex, $flow ) {
            $flow.removeFile($file);
            $scope.bug.attachments.splice($fileIndex, 1);
            console.log($scope.bug.attachments);
            //var returnData=JSON.parse($message);
            //$scope.bug.attachments.push({
            //    name:$file.name,
            //    url:returnData.url
            //});
            //console.log($scope.bug.attachments);
            ////$log.debug($flow);
            //$log.debug($file);
        }
    }]);