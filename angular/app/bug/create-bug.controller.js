'use strict';

angular.module('myApp.create-bug', ['ui.router', 'ui.bootstrap'])
    .controller('CreateBugCtrl', ['$scope', '$log','$uibModalInstance',function($scope, $log, $uibModalInstance) {
       $scope.ok = function(){
           $log.info($scope.bug);
           $uibModalInstance.close();
       };

        $scope.cancel=function(){
          $uibModalInstance.dismiss('cancel');
        };

        $scope.bug={};

        $scope.userAvailableForAssigment = [{id:1, name:"Użytkownik 1", avatar_url:"http://img1.jurko.net/avatar_2045.jpg"}
            ,{id:2, name:"Użytkownik 2", avatar_url:"http://img1.jurko.net/avatar_4610.jpg"}];
        $scope.bug.assigedTo = $scope.userAvailableForAssigment[0];

        $scope.products =[{id:1, name:"Produkt1"},{id:2, name:"Produkt2"}];
        $scope.bug.product=$scope.products[0];

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