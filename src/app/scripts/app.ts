//avoid compailer error messages
declare var angular: any;

module app {
  'use strict';

  angular.module('app', [
    // dependant
    'ui.router',
    'ngAnimate',
    'ngMockE2E',
    'dndLists',

    'app.data',
    'app.core',
    'app.layout',
    'app.main'
  ]);

}