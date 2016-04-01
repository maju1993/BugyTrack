'use strict';

angular.module('myApp.languageService', [])
    .factory('languageService', ['$http', '$q', 'localStorageService', 'apiRoot', function ($http, $q, localStorageService, apiRoot) {

    var languageServiceFactory = {};

    var _lang = 'pl';

    
    languageServiceFactory.lang = _lang;

    return languageServiceFactory;
}]);