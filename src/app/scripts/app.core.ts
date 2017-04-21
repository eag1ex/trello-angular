module app {
  'use strict';
  angular.module('app.core', []);

  angular
    .module('app.core')
    .config(configureStates)
    .run(appRun);

  appRun['$inject'] = ['httpbackedMockService'];
  function appRun(httpbackedMockService) {
    console.log();


    ////////
    //////// run fake server
    httpbackedMockService.run();
  }

  configureStates['$inject'] = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  /* @ngInject */
  function configureStates($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    var states: any[] = getStates();
    states.forEach(function (state) {
      console.log(state.state)
      $stateProvider.state(state.state, state.config);
    });
  }
  function getStates(): any[] {

    return [
      {
        state: 'main',
        config: {
          url: '/',
          template: '<main></main>',
          title: 'main',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
          },
        }
      }
    ];
  }
}

