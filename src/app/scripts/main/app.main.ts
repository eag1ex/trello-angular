module app.main {
  'use strict';
  export class MainController {
    public dataForModal: any;
    public lists = [];
    public dblclick: any;
    public category:any;
    public showdblclick1:any;
    static $inject: Array<string> = ['$scope', '$element', '$document', '$uibModal', '$timeout', '$q'];
    /* @ngInject */
    constructor(
      public scope: any,
      public element: any,
      public document: any,
      public modal: any,
      public timeout: any,
      public q: any
    ) {

    this.showdblclick1 = 'true';
      element.dblclick((e) => {
        if (e.target.nodeName == 'INPUT') return false;
        this.openModal(false, false);
        this.dblclick = true;
      })
       element.hover((e) => {     
        if (e.target.nodeName == 'DIV') {
          console.log(e.target.nodeName)
           this.showdblclick1 = true;
        }else{
           this.showdblclick1 = false; 
        }
      })

      this.lists = [
        {
          name: 'list 1',
          catList:'',
          tickets: [
            { title: 'task 1' },
            { title: 'task 2' }
          ],
          desc:'this is a Trello new project, please give me your feedback!'
        },
        {
          name: 'list 2',
          catList:'',
          tickets: [
            { title: 'task 3' },
            { title: 'task 4' }
          ],
          desc:'A new Trello Angular project what is your feedback!'
        }
      ]
    }

    openModal(elmData, _inx) {

      if (!elmData && !_inx) {
        console.log('new item')
        this.dataForModal = {
          inx: null
        }
      }
      else {
        console.log('update item')
        this.dataForModal = {
          lists: [elmData],
          inx: _inx
        }
      }

      this.modal.open({
        animation: true,
        template: `<ticket-modal
                    
                    modal-data="vm.modalData" $close="$close(result)" 
                    $dismiss="$dismiss(reason)"></ticket-modal>`,

        controller: ['modalData', function (modalData) {
          this.modalData = modalData;
        }],
        controllerAs: 'vm',
        resolve: {
          modalData: () => {
            return {
              cats:this.scope.$parent.$ctrl.category,
              main:this.dataForModal
            }
          }
        }
      }).result.then((result) => {
        //update
        if (_inx >= 0) this.lists[_inx] = result;
        //add new
        if (_inx == null) this.lists = this.lists.concat(result);

        if (this.dblclick) {
          this.lists = this.lists.concat(result);
          this.dblclick = false;
        }

      }, function (reason) {
        console.log('modal failed!', reason)
      });

    }

    addCard(elmData) {
      var tempData = angular.copy(elmData);

      var mergeData = (data) => {
        var deferred = this.q.defer();
        if (data) deferred.resolve(data);
        else deferred.reject('error data');
        return deferred.promise;
      }
      var datPromiss = mergeData(tempData);
      datPromiss.then((data) => {
        this.lists[0].tickets.push({ title: data });
      }).finally(() => {
        console.log('data updated')
        return;
      })

    }// addcard

    cancelAddCard(elmData) {
      /**
       * 
       * 
cardToBeAdded(elmData,i){
  var tempData = angular.copy(elmData);
      elmData.tickets.push({ title: 'task 1' }); 
      this.lists[i]= tempData;

}
       */
      console.log('elmData', elmData);
    }
    deleteCard(index){
             this.lists.splice(index,1);
             this.scope.$watch('lists',()=>{
                 console.log('card removed!')
             })          
    }


  }

  class MainComponent {

    constructor() { }
    restrict = 'E';
    controllerAs = "vm";
    templateUrl = 'dist/js/app.main.html';
    controller = MainController;
  }

  angular
    .module('app.main', [])
  angular
    .module('app.main').component('main', new MainComponent());

}
