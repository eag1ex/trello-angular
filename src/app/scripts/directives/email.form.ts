var emailTemplate;
module app.emailForm {
    'use strict';
    export class EmailFormController {

        static $inject: Array<string> = ['$scope', '$element', '$http', '$q', '$timeout']
        public myvar;
        public formClick;
        public myForm: any;
        public emailTo: any;
        // public myForm:any;
        constructor(
            public scope,
            public element,
            public http,
            public q,
            public timeout
        ) {

            timeout(() => {
                this.onSubmit();
                

            }, 100)
        }

        sendFormRequest() {
            console.log('http', this.http)
            var formis = this.scope.myForm.emailTo;
            if (!formis.$valid && !formis.$dirty && formis.$modelValue.lenght == 0) {
                console.log('fprm is not valid');
                return;
            }

            var parentUserData = this.scope.vm.modal.modalData.user;
            var DATA ={
                fName: parentUserData.firstName,
                lName: parentUserData.lastName,
                emailFrom: parentUserData.email,
                emailTo: formis.$modelValue,
                company: parentUserData.company
            };

            this.http({               
                params: DATA,
                method: 'GET',
                url: 'http://localhost:3100/send'
            }).then(function (success) {
                console.log('PostDataResponse', success);
            }, function (error) {
                console.log('PostDataResponse', error);
            });

        }


        onSubmit() {

            angular.element(this.element[0]).click('form', (e) => {
            })
            angular.element(this.element[0]).find('#emailField')




        }
    }

    class MainComponent {
        constructor() { }
        require = {
            modal: '^^ticketModal'
        }
        transclude = true;
        controllerAs = "vm";
        template = () => {
            return emailTemplate;
        }
        controller = EmailFormController;
    }
    angular.module('app.emailForm', []);
    angular.module('app.emailForm')
        .component('emailForm', new MainComponent());
}
/**
 * 
  var app = angular.module("app", []);
    app.controller("HttpGetController", function ($scope, $http) {

        $scope.SendData = function () {
           // use $.param jQuery function to serialize data from JSON 
            var data = $.param({
                fName: $scope.firstName,
                lName: $scope.lastName
            });
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('/ServerRequest/PostDataResponse', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };

    })



 */







emailTemplate =
    `<div class="px-0 container" ng-model="vm.form">
    <div class="has-success" ng-show='vm.form.is==1'>
        <div class="form-control-feedback">Email Send</div>
    </div>
    
  <form name="myForm" ng-submit="vm.form.is=1;" ng-hide='vm.form.is==1'>
    <div class="form-group row mb-1"
    ng-class="{'has-danger':myForm.emailTo.$invalid==true,
                'has-success':myForm.emailTo.$valid==true}">  

      <div class="col-12">
        <input name="emailTo"                
             ng-class="{'form-control-danger':myForm.emailTo.$invalid==true,
                         'form-control-success':myForm.emailTo.$valid==true && myForm.emailTo.$dirty==true && vm.emailTo.length>0 }"
             id="emailField" type="email" class="form-control w-100" placeholder="name@example.com" 
             ng-model="vm.emailTo">

        <!--<small class="form-text text-muted">Example help text that remains unchanged.</small>-->
      </div>
    </div>
    <button ng-click="vm.sendFormRequest();" type="submit" class="float-right btn btn-md btn-success" 
             ng-show="myForm.emailTo.$valid==true && 
                       myForm.emailTo.$dirty==true && 
                       vm.emailTo.length>0">Submit</button>
  </form>
</div>
`;