//avoid compailer error messages
declare var angular: any;
declare var _: any;
module app {
  'use strict';

  angular.module('app', [
    // dependant
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
   // 'ngMockE2E',
    'dndLists',

    'app.mockData',
    'app.core',
    'app.layout',
    'app.main',
    'app.projectName',
    'app.emailForm'
  ]);
}