describe('Testing MainCtr l', function(){
	var $scope, ctrl, $timeout;

	var someServiceMock;

	beforeEach(function(){
		someServiceMock = jasmine.createSpyObj('someService', ['someAsyncCall']);
		
		module('myApp');

		inject (function($rootScope, $controller, $q, _$timeout_){
			
			$scope = $rootScope.$new();
			
			someServiceMock.someAsyncCall.andReturn($q.when('weee'));

			$timeout = _$timeout_;

			crtl = $controller('MainCtrl', {
				$scope: $scope,
				someService: someServiceMock
			});
		});
	});

	it('should start with foo and bar populated', function (){
		expect($scope.foo).toEqual('foo');
		expect($scope.bar).toEqual('bar');
	});

	it('should add !!! to foo when test1() is called', function (){
		$scope.foo = 'x';
		$scope.test1();
		expect($scope.foo).toEqual('x!!!');
	});

	it('should update baz when bar is changed', function(){
		$scope.bar = 'test';
		$scope.$apply();

		expect($scope.baz).toEqual('testbaz');
	});	

	it('should update fizz asynchronously when test2() is called', function (){
		$scope.test2();
		expect(someServiceMock.someAsyncCall).toHaveBeenCalled();

		$timeout.flush();

		expect($scope.fizz).toEqual('weee');

	});

});

describe('Testing MainCtrl 2', function(){
	var $scope, ctrl;

	beforeEach(function(){
		
		module('myApp');
		inject (function($rootScope, $controller){
			
			$scope = $rootScope.$new();
			
			crtl = $controller('MainCtrl2', {
				$scope: $scope
			});
		});

	});

 	it('has correct initial values', function() {
        expect($scope.value).toBe(0);
        expect($scope.maxValue).toBe(3);  
    });

    it('increment correctly', function(){
    	$scope.incrementValue();
    	expect($scope.value).toBe(1);
    	$scope.incrementValue();
    	expect($scope.value).toBe(2);
    	$scope.incrementValue();
    	expect($scope.value).toBe(3);
    });

    it('increment until or up max value', function(){
    	$scope.value = 3;
     	$scope.incrementValue();
    	expect($scope.value).toBe(0);

		$scope.value = 4;
     	$scope.incrementValue();
    	expect($scope.value).toBe(0);

    });

});


describe('Controller: List Libraries Controller', function (){
	var scope, restService, $location;
	
	beforeEach(function(){

		var mockRestService = {};

		module('myApp', function($provide){
			$provide.value('restService', mockRestService);
		});

		inject(function($q) {
			mockRestService.data = [
				{
					id:0,
					name:'Angular'
				},
				{
					id:1,
					name:'Ember'
				},
				{
					id:2,
					name:'Backbone'
				}
			];

			mockRestService.getAll = function (){
				var defer = $q.defer();
				defer.resolve(this.data);
				return defer.promise;
			};	

			mockRestService.create = function(name){
				var defer = $q.defer();
				var id = this.data.length;

				var item = {
					id:id,
					name: name
				};

				this.data.push(item);
				defer.resolve(item);

				return defer.promise;
			};
		});

	});

	beforeEach(inject(function($controller, $rootScope, _$location_, _restService_) {
		scope = $rootScope.$new();
		$location = _$location_;
		restService = _restService_;

		$controller('ListLibrariesCtrl', {
			$scope: scope,
			$location: $location,
			restService: restService
		});

		scope.$digest();
	}));

	it('should contain all the libraries at startup', function() {
		expect(scope.libraries).toEqual([
			{
				id:0,
				name:'Angular'
			},
			{
				id:1,
				name:'Ember'
			},
			{
				id:2,
				name:'Backbone'
			}
		]);
	});

	it('should create new libraries and append it to the list', function() {
		scope.newItemName = "porra";
		scope.create();

		var lastLibrary = scope.libraries[scope.libraries.length -1];

		expect(lastLibrary).toEqual({
			id: 3,
			name: 'porra'
		});
	});

	it('should redirect us to a library detais page', function() {
		spyOn($location, 'path');
		var aLibrary = scope.libraries[0];

		scope.goToDetails(aLibrary);

		expect($location.path).toHaveBeenCalledWith('/libraries/0/details');
	});
});








