module app {
  'use strict';

  angular.module('app.data', [
    // dependant
    'app.data.mockData',
    'app.data.httpMock',
    'app.data.dataservice'
  ]); 
}