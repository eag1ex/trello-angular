module app.main {
  'use strict';
  export class MainController {
    public dataForModal: any;
    public lists = [];
    public dblclick: any;
    static $inject: Array<string> = ['$scope', '$element', '$document', '$uibModal', '$timeout'];
    /* @ngInject */
    constructor(
      public scope: any,
      public element: any,
      public document: any,
      public modal: any,
      public timeout: any
    ) {

      element.dblclick((e) => {
        if (e.target.nodeName == 'INPUT') return false;
        this.openModal(false, false);
        this.dblclick = true;
      })

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
        template: `<ticket-modal ng-init="vm.modalData"
                    modal-data="vm.modalData" $close="$close(result)" 
                    $dismiss="$dismiss(reason)"></ticket-modal>`,

        controller: ['modalData', function (modalData) {
          this.modalData = modalData;
        }],
        controllerAs: 'vm',
        resolve: {
          modalData: () => {
            return this.dataForModal;
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
