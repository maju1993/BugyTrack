'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.bug-list',
  'myApp.create-bug',
  'myApp.bug-details',
  'myApp.version',
  'ui.bootstrap',
  'ui.select',
  'ngAnimate',
  'ui.router',
  'flow'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/bugs");

  $stateProvider
    .state('bugs', {
      url: "/bugs",
      templateUrl: "bug/bug-list.html",
      controller:"BugListCtrl"
    })
    .state("bugs.create",{
      url: "/create",
      onEnter: ['$stateParams', '$state', '$uibModal', '$log', function($stateParams, $state, $uibModal, $log) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bug/create-bug.html',
          controller: 'CreateBugCtrl'
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

.directive('clientHeight', function(){
  return {
    link:function($scope, $elem, $attrs){
      $elem.css('height', window.innerHeight*$attrs.clientHeight/100+'px');
      $elem.css('overflow-y', 'scroll');
    }
  }
});
