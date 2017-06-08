'use strict';
describe('app core initiating', function () {
    var API,$rootScope, $urlRouterProvider, $state, $injector, myServiceMock, $locationProvider, $qProvider, $window;


    beforeEach(function () {

        module('ui.router');
        module('ui.bootstrap');
        
        module(function (_$locationProvider_, _$urlRouterProvider_, _$qProvider_) {
            $locationProvider = _$locationProvider_;
            $urlRouterProvider = _$urlRouterProvider_;
            $qProvider = _$qProvider_;
            
            spyOn($locationProvider, 'html5Mode');
            spyOn($urlRouterProvider, 'otherwise');
            spyOn($qProvider, 'errorOnUnhandledRejections');
           
        });


        module('app', function ($provide) {
            // $provide.value('myService', myServiceMock = {});
             $provide.constant("API",true);
            /*
              messenger = {
                send: jasmine.createSpy('send')
            };
          //  $provide.value('messenger', messenger);
          */
        });

        inject(function (_$rootScope_, _$state_, _$injector_, $templateCache, _$window_,API) {
            API = API;
            $window =_$window_;
            $rootScope = _$rootScope_.$new();
            $state = _$state_;
            $injector = _$injector_;
            $templateCache.put('dist/js/app.layout.html', '');
            $state.go('main');
            spyOn($window, 'onload');
            $rootScope.$apply();
           
        });
    });

    it('should have correct config settings', function () {
        expect($locationProvider.html5Mode)
            .toHaveBeenCalledWith(true);

        expect($qProvider.errorOnUnhandledRejections)
            .toHaveBeenCalledWith(false);

        expect($locationProvider.html5Mode)
            .toHaveBeenCalledWith(true);
    });

     it('constants to be defind', function () {
       expect($injector.get("API")).toBeDefined();
       // expect(API).toBeDefined();
    });

     it('$onload to have been executed', function () {
        $window.onload();
        expect($window.onload).toHaveBeenCalled();
    });

    it('angularLoader should not yet be loaded ', function () {
        expect($rootScope.angularLoader).toBe(0);

    });

    it('$stateChangeSuccess was succesfull', function () {

        var stateChangeSuccess = false;
        $rootScope.$on('$stateChangeSuccess', function (event, next, current) {
            stateChangeSuccess = true;
           
        });

        $rootScope.$broadcast('$stateChangeSuccess');
        expect(stateChangeSuccess).toBe(true);
    });


    it('should have correct ui configuration', function () {

        expect($state.current.name).toBe('main');
        expect($state.current.template).toBe('<main></main>');
        // expect($state.href(state, { id: 1 })).toEqual('#/state/1');
    });

});

