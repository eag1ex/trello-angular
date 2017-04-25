module app.layout {
  'use strict';

  export class LayoutController {
    static $inject: Array<string> = ['$scope','mockData'];
    public category:any;
    constructor(public scope:any, private mockData:any) {

      /**
       *  The hierarchy of this app is:
       *  Layout  <<< mockData
       *     > main  <<< mockData
       *        > modal <<< data from parent
       *          > send form  <<< data from parent
       *             >> form is send if the nodemailer is running.
       */

      

     mockData.data().then((data)=>{
      this.category = data.category;
     },(error)=>{
       console.log('category data not available', error)
     })

    } 

  }
  angular
    .module('app.layout', []);

  angular
    .module('app.layout')
    .controller('layoutController', LayoutController);
}
