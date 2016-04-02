'use strict';

angular.module('myApp.bugService', [])
    .factory('bugService', ['$http', '$q', 'apiRoot', function($http, $q, apiRoot) {
        var someValue = '';
        var service = {
            getBugs: getBugs
        };
        return service;


        function getBugs() {
            return  $http({
                method: 'GET',
                url: apiRoot + '/bugs',
                //params: 'limit=10, sort_by=created:desc',
                //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
            });
            // var deferred = $q.defer();
            // $http({
            //     method: 'GET',
            //     url: apiRoot + '/bugs',
            //     //params: 'limit=10, sort_by=created:desc',
            //     //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
            // }).success(function (data) {
            //     // With the data succesfully returned, we can resolve promise and we can access it in controller
            //     deferred.resolve(data);
            // }).error(function () {
            //     alert("error");
            //     //let the function caller know the error
            //     deferred.reject(error);
            // });
            // return deferred.promise;
        };

        function validate() {
            /* */
        };
    }]);