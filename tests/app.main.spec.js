'use strict';

describe('Main component', function () {
    var compController, MockData, $rootScope, $scope, $q, $elm, spy, $compile;

    beforeEach(module('app'));
    beforeEach(module('app.mockData'));
    beforeEach(module('ui.bootstrap'));

    beforeEach(function () {

        inject(function (_$componentController_, $document, $timeout, _$q_, _$rootScope_, mockData, $uibModal, _$compile_) {
            $q = _$q_;
            $compile = _$compile_;

            $scope = {};
            $rootScope = _$rootScope_.$new();
            angular.element.prototype.dblclick = function () { };

            var element = angular.element('<div></div>');
            $elm = element;

            var inject = { $scope: $scope, $element: $elm, $document: $document, $timeout: $timeout, $q: $q, $uibModal: $uibModal, mockData: mockData }
            compController = _$componentController_('main', inject);
            
            spyOn(compController.mockData, 'data')
            spyOn(compController, 'openModal')//.and.callThroughWith(true,true);
            compController.openModal(true,true) 
            compController.mockData.data();
            $rootScope.$apply();
        });

    });
 
   
    it('openModal to have been called', function () {
        expect(compController.openModal).toHaveBeenCalled();
        expect(compController.openModal).toHaveBeenCalledWith(true,true);
    }) 


    it('checking component scope variables', function () {
        expect(compController.mockData.data).toHaveBeenCalled();
        expect(compController.user).toBeDefined();
        expect(compController.dataForModal).toBeDefined();
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

