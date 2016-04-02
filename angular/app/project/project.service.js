'use strict';

angular.module('myApp.projectService', [])
    .factory('projectService', ['$http', '$q', 'apiRoot', function($http, $q, apiRoot) {
        var someValue = '';
        var service = {
            getProjects: getProjects
        };
        return service;


        function getProjects() {
            return $http({
                method: 'GET',
                url: apiRoot + '/projects',
                //params: 'limit=10, sort_by=created:desc',
                //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
            });
        };
    }]);