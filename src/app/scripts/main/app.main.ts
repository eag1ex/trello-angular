module app.main {
  'use strict';


  export class MainController {
    public clientOrders: any;
    public remarks: any;
    public clientDetails: any;
    public lists = []
    static $inject: Array<string> = ['$q', 'dataservice', '$state', '$scope'];
    /* @ngInject */
    constructor(private $q,
      private dataservice: any,
      private state: any,
      public scope: any
    ) {

      //this.get();

      this.lists = [
        {
          name: 'list 1',
          tickets: [
            { title: 'task 1' },
            { title: 'task 2' }
          ]
        },
        {
          name: 'list 2',
          tickets: [
            { title: 'task 3' },
            { title: 'task 4' }
          ]
        }
      ]

    }

    get() {
      /* 
       this.dataservice.get().then((data) => {
         this.clientDetails = data.orders[0].client[0];
         // purchases
         var oldData = data.orders[0].purchase[0];
         var newData = [];
         var i = 0;
         while (i < 6) {
           newData.push(oldData);
           i++;
         }
         this.clientOrders = newData;
 
         // remarks
         this.remarks = data.orders[0].remarks[0];
       });
       */

    }
    addTick(list) {
      list.tickets.push({})
    }
    addList(_t) {
      console.log(angular.element(_t));
      this.lists.push({ name: 'new list', tickets: [] })
    }
 
  }

  class MainComponent {

    constructor() { }
    restrict = 'E';
    // transclude: true;
    controllerAs = "vm";
    templateUrl = 'dist/js/app.main.html';
    controller = MainController;
  }


  angular
    .module('app.main', [])
  angular
    .module('app.main').component('main', new MainComponent());


}
