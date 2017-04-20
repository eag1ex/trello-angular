module app.layout {
  'use strict';

  export class LayoutController {
    static $inject: Array<string> = ['$rootScope', 'dataservice'];
    public menus: any;
    public loginDetails: any;
    constructor(private $rootScope: any, public dataservice: any) {
      // this.test='layoutController';
     // this.get();
    } 

    get() {
     /* 
      this.dataservice.get().then((data) => {
        this.loginDetails = data.loginDetails[0];
        console.log('data', data.menuItems)
        this.menus = data.menuItems;
      });
      */
    }

  }
  angular
    .module('app.layout', []);

  angular
    .module('app.layout')
    .controller('layoutController', LayoutController);
}
