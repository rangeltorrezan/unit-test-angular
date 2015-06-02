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

describe('Testing MainCtrl 3', function(){
	var scope, createController, httpBackend;
	beforeEach(function(){
		
		module('myApp');
		inject (function($controller, $rootScope, $httpBackend){
			scope = $rootScope.$new();
	        httpBackend = $httpBackend;
	        createController = function() {
	            return $controller('MainCtrl3', {
	                $scope: scope,
	                $http: $httpBackend
	            });
	        };							
		});

	});
 
	 it('sets correct initial values', function() {
     	httpBackend.expectGET('api/incrementor/config').respond(200, {
        	initialValue: 0,
            maxValue: 3
        });

        createController();
        httpBackend.flush();
        expect(scope.value).toBe(0);
        expect(scope.maxValue).toBe(3);
    });
    
});