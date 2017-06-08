describe('MovieCore', function() {

	var myData, MockData
	beforeEach(module('app'));

	beforeEach(inject(function( _$httpBackend_,dataservice,mockData) {
		myData = dataservice;
        MockData = mockData;
		$httpBackend = _$httpBackend_;

        // spyOn(MockData, 'data');

	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	})


	it('should get data', function() {
        
       var user = MockData.data().user;
       expect(user).toBeDefined();  


      var response;	

		$httpBackend.expectGET('/api')
			.respond(200, user);

		myData.get()
			.then(function(data) {
				response = data;
			});

		$httpBackend.flush()

		expect(response).toEqual(user);  

		//expect($httpBackend.flush).not.toThrow();
	});


});
