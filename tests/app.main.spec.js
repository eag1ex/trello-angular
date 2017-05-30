'use strict';

describe('Main component', function () {
    var compController, MockData, $rootScope, $scope, $q, $elm, spy, $compile, template, $timeout, element;

    beforeEach(module('app'));
    beforeEach(module("src/app/scripts/main/app.main.html"));
    beforeEach(module('app.main'));
    beforeEach(module('app.main.modal'));
   
    beforeEach(function () {

        inject(function (_$componentController_, $document, _$timeout_, _$q_, _$rootScope_, mockData, $uibModal, _$compile_, $templateCache) {
            $q = _$q_;
            $compile = _$compile_;
            $timeout = _$timeout_;
            $scope = {};
            $rootScope = _$rootScope_.$new();
            angular.element.prototype.dblclick = function () { };
            template = $templateCache.get('dist/js/app.main.html');
            element = angular.element(template);
            element= $compile(element)($rootScope);
            var inject = { $scope: $rootScope, $element: element, $document: $document, $timeout: $timeout, $q: $q, $uibModal: $uibModal, mockData: mockData }
            compController = _$componentController_('main', inject);
           // angular.element(document.body).append(element);// important
            spyOn(compController.mockData, 'data')
            spyOn(compController, 'openModal')//.and.callThroughWith(true,true);
            spyOn(compController, 'addCard');
            spyOn(compController, 'test');

             compController.test();

            $rootScope.$apply(); 
        }); 
    });

 
     it('test passed', function () {
       // expect(angular.element(element[3]).find('[ng-click]')).toBe(1);

         expect(compController.test).toHaveBeenCalled();
        // expect(compController.test1).toBe(1);
    })

    it('template to be full', function () {
        expect(template).toBeDefined();
        //http://daginge.com/technology/2013/12/14/testing-angular-templates-with-jasmine-and-karma/
        /*
         templateAsHtml = template.html();
         expect(templateAsHtml).toContain($scope.header);
         expect(templateAsHtml).toContain($scope.text);
         expect(templateAsHtml).toNotContain(previousHeader);
         expect(templateAsHtml).toNotContain(previousText);
         */
    })


    it('addCard to have been called', function () {
        compController.addCard(compController.lists[0], 0);

        expect(compController.addCard).toHaveBeenCalledWith(compController.lists[0], 0);
        expect(typeof (compController.lists)).toBe('object');
        expect(compController.addCard).toHaveBeenCalled();
        //expect(compController.openModal).toHaveBeenCalledWith(22, 22);
    })

    it('openModal to have been called', function () {
        compController.openModal(22, 22);
        expect(compController.openModal).toHaveBeenCalled();
        expect(compController.openModal).toHaveBeenCalledWith(22, 22);
    })


    it('checking component scope variables', function () {
        compController.mockData.data();
        compController.openModal(compController.lists[0], 2);
    
        expect(compController.mockData.data).toHaveBeenCalled();
        expect(compController.user).toBeDefined();
       // expect(compController.dataForModal).toBe();
        expect(typeof (compController.user)).toBe('object');
        expect(typeof (compController.lists)).toBe('object');
    })


    /*
        it('should load a list of books on init', function () {
            expect(booksController.booksList).toBeDefined();
            expect(booksController.booksList).toBe(mockBookList);
            expect(booksController.booksList.length).toBe(3);
        })
    
        it('should select a book for the details view', function () {
            expect(booksController.selectedBook).toBeUndefined();
    
            booksController.selectBook(mockBookList[0]);
            expect(booksController.selectedBook).toBe(mockBookList[0]);
    
            booksController.selectBook(mockBookList[2]);
            expect(booksController.selectedBook).toBe(mockBookList[2]);
        })
    
        it('should call the service to delete a book', function () {
            var deferred = $q.defer();
            booksServiceMock.deleteBook.and.returnValue(deferred.promise);
    
            booksController.deleteBook('2');
            expect(booksServiceMock.deleteBook).toHaveBeenCalledWith('2');
        })
    
        it('should reload the book list after successfully deleting a book', function () {
            var deferred = $q.defer();
            booksServiceMock.deleteBook.and.returnValue(deferred.promise);
    
            booksServiceMock.getBooks.calls.reset();
            expect(booksServiceMock.getBooks).not.toHaveBeenCalled();
    
            booksController.deleteBook('1');
            deferred.resolve(true);
            $rootScope.$apply();
            expect(booksServiceMock.getBooks).toHaveBeenCalled();
        })
        */

});

