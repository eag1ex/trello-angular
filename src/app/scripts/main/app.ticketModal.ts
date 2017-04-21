module app.main.modal {
    'use strict';
    export class MainController {
        public handleClose: any;
        public handleDismiss: any;
        public tempData:any=[];
        public $dismiss: any;
        public modalData:any;
        public $close: any;
        static $inject: Array<string> = ['$scope', '$element','$timeout'];
        /* @ngInject */
        constructor(
            public scope: any,
            public element: any,
            public timeout:any,
        ) {
           // initialize 
            this.modalInit()          
            
        }
        modalInit() {
            this.timeout(()=>{
                    if(this.modalData.inx!=null){
                       
                        this.tempData = angular.copy(this.modalData.lists[0]);
                        
                    }else{
                        this.tempData={ name: 'new list', tickets: [] }
                    }
            },100)

            this.handleClose = () => {                   
                  this.$close({ result: this.tempData},function(){
                     this.tempData=[];
                  });
                 
            };
            this.handleDismiss = () => {
                this.$dismiss({
                    reason: 'cancel'
                });
            };

        }
        addList() {
            this.tempData.tickets.push({ title: 'task 1' });
        }

    }

    class MainComponent {
        constructor() { }
        bindings = {
            $close: '&',
            $dismiss: '&',
            modalData: '<'
        };
        controllerAs = "vm";
        templateUrl = 'dist/js/app.modal.html';
        controller = MainController;
    }

    angular
        .module('app.main.modal', [])
    angular
        .module('app.main.modal').component('ticketModal', new MainComponent());

}





/*
      var opts = {
        backdrop: true,
        backdropClick: true,
        dialogFade: false,
        keyboard: true,
        controllerAs: '$ctrl',
        templateUrl: 'app.ticketModal.html',
        controller: /* @ngInject ModalInstanceCtrl,
      //  resolve: {} // empty storage
      //};
*/