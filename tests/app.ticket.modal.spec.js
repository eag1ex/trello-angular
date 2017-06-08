'use strict';
describe('ticket component', function () {
    var compController, mockData, $rootScope, $compile, $timeout, element, scope, template;

    beforeEach(module('app'));
    beforeEach(module("src/app/scripts/main/app.modal.html"));
    beforeEach(function () {
        inject(function (_$componentController_, _$timeout_, _$rootScope_, _$compile_, $templateCache) {

            var lists = {
                id: 0,
                name: 'list 1',
                catList: '',
                tickets: [
                    { title: 'task 1' },
                    { title: 'task 2' }
                ],
                desc: 'this is a Trello new project, please give me your feedback!'
            }

            mockData = {
                main: {
                    lists: [lists],
                    inx: 0
                },
                cats: [
                    'Inspiration',
                    'On Hold',
                    'Done',
                    "In Progress"
                ]
            }


            $compile = _$compile_;
            $timeout = _$timeout_;
            $rootScope = _$rootScope_.$new();
            template = $templateCache.get('dist/js/app.modal.html');

            element = angular.element(template);

            $compile(element)($rootScope);


            var inject = { $scope: $rootScope, $element: element, $timeout: $timeout }

            var bindingsParams = {
                modalData: mockData,
                $close: function () { return true; }
            };
            compController = _$componentController_('ticketModal', inject, bindingsParams);
            angular.element(document.body).append(element);
            spyOn(compController, 'modalInit')
            spyOn(compController, '$close')
            spyOn(compController, 'handleClose')


            compController.modalInit();
            $rootScope.$apply();
            // scope = compiledElement.isolateScope();
        });
    });

    it('check element contents is ok', function () {

        expect(element.html()).toContain('ticket in vm.tempData.tickets track by $index');
    })


    it('check ticket binding', function () {

        expect(compController.modalData.main).toBeDefined();

    })

    it('check modalInit to have been executed', function () {

        expect(compController.modalInit).toHaveBeenCalled();

        $timeout.flush(100);
        expect(compController.cats).toBeDefined();
        expect(compController.tempData).toBeDefined();

    })

    it('modal closehandle to have been called', function () {
        compController.handleClose();
        compController.$close()

        $timeout.flush(100);

        expect(compController.tempData.id).toBeDefined()

        //$('#findme button').trigger('click'); 
        //<button class="btn-sm btn btn-secondary m-1" type="button" ng-click="vm.handleClose()">Save</button>
        // expect($('button').find('#handleClose').html()).toBe(1);
        expect(compController.handleClose).toHaveBeenCalled();
        expect(compController.$close).toHaveBeenCalled()
        // expect(compController.tempData).toBe(1)
    })



});

