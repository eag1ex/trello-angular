'use strict';
describe('Main component', function () {
    var findElm, compController, MockData, $rootScope, $scope, $q, $elm, spy, $compile, template, $timeout, element, modal;

    beforeEach(module('app'));    
    beforeEach(module("src/app/scripts/main/app.main.html"));

    beforeEach(function () {
        inject(function (_$componentController_, $document, _$timeout_, _$q_, _$rootScope_, mockData, $uibModal, _$compile_, $templateCache) {
            $q = _$q_;
            modal = $uibModal;
            $compile = _$compile_;
            $timeout = _$timeout_;
            $scope = {};
            $rootScope = _$rootScope_.$new();
            angular.element.prototype.dblclick = function () { };
            template = $templateCache.get('dist/js/app.main.html');

            element = angular.element(template);

            $compile(element)($rootScope);
            var inject = { $scope: $rootScope, $element: element, $document: $document, $timeout: $timeout, $q: $q, $uibModal: $uibModal, mockData: mockData }
            compController = _$componentController_('main', inject);
            angular.element(document.body).append(element);

            spyOn(compController.DataService, 'get');
            spyOn(compController, 'openModal').and.callFake(function () {
                // var deferred = _$q_.defer();
                // deferred.resolve(555);
                //return deferred.promise;
            });
            spyOn(compController, 'addCard');
            spyOn(compController, 'test');
            spyOn(modal, 'open');

          
            compController.test('hello112');

            $rootScope.$apply();
        });
    });


    it('check template and variables', function () {
        //findElm
      //  expect(findElm).toBe(1);
        expect(template).toBeDefined();
        expect(element.html()).toContain('list in vm.lists');
        expect(element.html()).toContain('ticket in list.tickets track by $index');
        //http://daginge.com/technology/2013/12/14/testing-angular-templates-with-jasmine-and-karma/

        // var templateAsHtml = element.html();

        //element
        // expect(element.html()).toContain('list in vm.lists');
        // expect(templateAsHtml).toContain($scope.text);
        // expect(templateAsHtml).toNotContain(previousHeader);
        // expect(templateAsHtml).toNotContain(previousText);      
        //openModal
    })

    it('addCard to have been called', function () {

        compController.addCard(compController.lists[0], 0);

        expect(compController.addCard).toHaveBeenCalledWith(compController.lists[0], 0);
        expect(typeof (compController.lists)).toBe('object');
        expect(compController.addCard).toHaveBeenCalled();
    })

    it('check modal functionality', function () {

        // trigger openModal
        $('#findme button').trigger('click'); 
        $('.ticket.list-group-item:first').eq(0).trigger('click'); 

        modal.open();
        expect(compController.openModal).toHaveBeenCalled();
        expect(modal.open).toHaveBeenCalled();

    })

    it('checking component scope variables', function () {

        compController.DataService.get(); 
        expect(compController.DataService.get).toHaveBeenCalled();
       // expect(compController.user).toBeDefined();

       // expect(typeof (compController.user)).toBe('object');
        expect(typeof (compController.lists)).toBe('object');
    })
});

