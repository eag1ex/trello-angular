module app.main {
  'use strict';
  export class MainController {
    public dataForModal: any;
    public lists = [];
    public category: any;
    public showdblclick1: any;
    public user:any;
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



      element.dblclick((e) => {
        if (e.target.nodeName == 'INPUT') return false;
        this.openModal(false, null);
      })
      element.hover((e) => {
        if (e.target.nodeName == 'DIV') {
          console.log(e.target.nodeName)
          this.showdblclick1 = true;
        } else {
          this.showdblclick1 = false;
        }
      })

      this.user=
        {
          firstName:"Guy",
          lastName:"",
          company:"Invision",
          email:"guy@email.com",
        }
      

      this.lists = [
        {
          id: 0,
          name: 'list 1',
          catList: '',
          tickets: [
            { title: 'task 1' },
            { title: 'task 2' }
          ],
          desc: 'this is a Trello new project, please give me your feedback!'
        },
        {
          id: 1,
          name: 'list 2',
          catList: '',
          tickets: [
            { title: 'task 3' },
            { title: 'task 4' }
          ],
          desc: 'A new Trello Angular project what is your feedback!'
        }
      ]
    }

    openModal(elmData, _inx) {

      //new item
      if (!elmData && !_inx) {
        this.dataForModal = {
          newIndex: this.lists.length,

        }
      }
      //updating item
      else {
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
              cats: this.scope.$parent.$ctrl.category,
              main: this.dataForModal,
              user: this.user
            }
          }
        }
      }).result.then((result) => {
        var ListsTotalLenght = this.lists.length - 1;

        //update
        if (_inx <= ListsTotalLenght) this.lists[_inx] = result;

        //add new
        if (result.id > ListsTotalLenght) {
          // sord latest to oldest
          this.lists = _.orderBy(this.lists.concat(result), ['id'], ['desc', 'asc']);
        }

      }, function (reason) {
        console.log('modal failed!', reason)
      });

    }

    addCard(elmData, i) {
      var tempData = angular.copy(elmData);

      var mergeData = (data) => {
        var deferred = this.q.defer();
        if (data) deferred.resolve(data);
        else deferred.reject('error data');
        return deferred.promise;
      }
      var datPromiss = mergeData(tempData);
      datPromiss.then((data) => {
        this.lists[i].tickets.unshift({ title: data });
        
      }).finally(() => {
        console.log('data updated')
        return;
      }).catch((error) => {
        // console.log('error',error)
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
    deleteCard(index) {
      this.lists.splice(index, 1);
      this.scope.$watch('lists', () => {
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
    .module('app.main', ['app.main.modal'])
  angular
    .module('app.main').component('main', new MainComponent());

}
