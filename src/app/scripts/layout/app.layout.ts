module app.layout {
  'use strict';

  export class LayoutController {
    static $inject: Array<string> = ['$rootScope','$scope'];
    public menus: any;
    public category:any;
    public projectName:any;
    public loginDetails: any;
    constructor(private $rootScope: any, public scope:any) {
      // this.test='layoutController';
     // this.get();
     this.init();
    } 


    init(){
    
        this.scope.$broadcast('myCustomEvent', {
          someProp: 'Sending you an Object!' // send whatever you want
        });

     this.category=[
        'Inspiration',
        'On Hold',
        'Done',
        "In Progress"
      ];

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
