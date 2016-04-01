'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.bug-list',
  'myApp.create-bug',
  'myApp.bug-details',
  'myApp.projectService',
  'myApp.bugService',
  'myApp.socketService',
  'myApp.accountService',
  'myApp.authService',
  'myApp.authInterceptorService',
  'myApp.languageService',
  'myApp.register',
  'myApp.login',
  'myApp.version',
  'LocalStorageModule',
  'ui.bootstrap',
  'ui.select',
  'ngAnimate',
  'ui.router',
  'flow',
  'pascalprecht.translate',
  'ngSanitize'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");

  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "account/login.html",
      controller:"LoginCtrl",
      authenticate: false
    })
    .state('register', {
      url: "/register",
      templateUrl: "account/register.html",
      controller:"RegisterCtrl",
      authenticate: false
    })
    .state('bugs', {
      url: "/bugs",
      templateUrl: "bug/bug-list.html",
      controller:"BugListCtrl",
      authenticate: true
    })
    .state("bugs.create",{
      url: "/create",
      onEnter: ['$stateParams', '$state', '$uibModal', '$log', function($stateParams, $state, $uibModal, $log) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bug/create-bug.html',
          controller: 'CreateBugCtrl',
          backdrop :'static'
          //size: 'lg',
          //resolve: {
          //    $uibModalInstance: function () {
          //        return modalInstance;
          //    }
          //}
        });
        modalInstance.result.then(function (selectedItem) {
          $log.debug(selectedItem);
          //$state.go('bugs');
        })
        .finally( function () {
          $state.go('bugs');
          $log.info('Modal dismissed at: ' + new Date());
        });
      }]
    })
    .state("bugDetails",{
      url: "/bugs/:id",
      templateUrl: "bug/bug-details.html",
      controller:"BugDetailsCtrl"
    });
})

.constant('apiRoot','http://localhost:8080/api')

.config(['flowFactoryProvider', 'apiRoot', function (flowFactoryProvider, apiRoot) {
  flowFactoryProvider.defaults = {
    target: apiRoot+'/upload',
    testChunks:false
    //permanentErrors:[404, 500, 501]
  };
}])

.run(function($rootScope, $state, authService){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !authService.authentication.isAuth){
            // User isn’t authenticated
            $state.transitionTo("login");
            event.preventDefault(); 
        }
    });  
})

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})

.config(function ($translateProvider) {
  $translateProvider.translations('pl', {
    Login: 'Zaloguj',
    Register: 'Rejestracja'
  });
  $translateProvider.translations('en', {
    Login: 'Login',
    Register: 'Register'
  });
  $translateProvider.useSanitizeValueStrategy('sanitize');
})

.run(function($translate, languageService){
    $translate.use(languageService.lang);
  //$translate.preferredLanguage(languageService.lang);
})

.directive('clientHeight', function(){
  return {
    link:function($scope, $elem, $attrs){
      $elem.css('height', window.innerHeight*$attrs.clientHeight/100+'px');
      $elem.css('overflow-y', 'scroll');
    }
  }
});
