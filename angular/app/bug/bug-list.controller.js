'use strict';

angular.module('myApp.bug-list', ['ngAnimate', 'ui.bootstrap', 'ui.router'])
    .controller('BugListCtrl', ['$scope', 'bugService', function($scope, bugService) {
        init();
        
        function init(){
           bugService.getBugs().then(function(response) {
               $scope.bugs = response.data;
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