'use strict';

angular.module('myApp.bug-list', ['ngAnimate', 'ui.bootstrap', 'ui.router'])
    .controller('BugListCtrl', ['$scope', '$translate', 'bugService', function($scope, $translate, bugService) {
        $scope.nextPage=_nextPage;
        $scope.statuses=[];
        $scope.filters={};
        $scope.priorities=[1,2,3,4,5];
        
        init();
        
        function init(){
           bugService.getBugs().then(function(response) {
               $scope.bugs = response.data;
           });
           _initStatuses();
        }
        
        function _nextPage() {
            if($scope.busy)
                return;
            $scope.busy=true;
            
            bugService.getBugs().then(function(response){
                for(var i=0;i<response.data.length;i++){
                    $scope.bugs.push(response.data[i]);
                    console.log(response.data[i]);
                }
                $scope.busy=false;
            });
        }
        
        function _initStatuses(){
            $translate('Statuses.New').then(function (display) {
                 $scope.statuses.push({display:display, value:'new'})
            });
             $translate('Statuses.Done').then(function (display) {
                 $scope.statuses.push({display:display, value:'done'})
            });
             $translate('Statuses.InTesting').then(function (display) {
                 $scope.statuses.push({display:display, value:'inTesting'})
            });
             $translate('Statuses.InProgress').then(function (display) {
                 $scope.statuses.push({display:display, value:'inProgress'})
            });
        }
        
        // $scope.bugs = [
        //     {
        //         id: '72ada242-bb84-466c-8d78-517e84182be3',
        //         groupId: '081e105e-a66f-4e71-be06-c8acc7bd7601',
        //         assignedToId: '6bfcd9f5-137e-400d-85ce-11080766b7b6',
        //         severity: '1',
        //         status: 'Nowy',
        //         creationTimestamp: new Date(),
        //         DeltaTimestamp: new Date(),
        //         key: 'BUGYTRACK-001',
        //         summary: 'Mail podczas rejestracji nie został wysłany',
        //         assigendTo: 'Adam Abacki',
        //         reporter: 'Andrzej Kowalski',
        //         operationSystemId: 'osfcd9f5-137e-400d-85ce-11080766b7b6',
        //         priority: 'Niski',
        //         productId: '1',
        //         repPlatformId: '1'
        //     },
        //     {
        //         id: '72ada242-bb84-466c-8d78-517e84182be4',
        //         groupId: '081e105e-a66f-4e71-be06-c8acc7bd7601',
        //         assignedToId: '6bfcd9f5-137e-400d-85ce-11080766b7b6',
        //         severity: '1',
        //         status: 'W toku',
        //         creationTimestamp: new Date(),
        //         DeltaTimestamp: new Date(),
        //         key: 'BUGYTRACK-002',
        //         summary: 'Złe kodowanie napisu w stopce',
        //         assigendTo: 'Andrzej Kowalski',
        //         reporter: 'Wiktor Nowak',
        //         operationSystemId: 'osfcd9f5-137e-400d-85ce-11080766b7b6',
        //         priority: 'Średni',
        //         productId: '1',
        //         repPlatformId: '1'
        //     }
        // ];

    }]);