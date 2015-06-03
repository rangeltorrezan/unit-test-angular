var app = angular.module('myApp', [])

app.controller ('MainCtrl', function($scope, someService){
	$scope.foo = 'foo';
	$scope.bar = 'bar';

	$scope.test1 = function(){
		$scope.foo = $scope.foo + '!!!'
	};

	$scope.test2 = function (){
		someService.someAsyncCall($scope.foo).then(function(data){
			$scope.fizz = data;
		});
	};

	$scope.$watch('bar', function(v){
		$scope.baz = v + 'baz';
	})

});


app.controller('MainCtrl2', function($scope) {
    $scope.value = 0;
    $scope.maxValue = 3;
    
    $scope.incrementValue = function() {
        if ($scope.value < $scope.maxValue) {
            $scope.value++;
        } else {
            $scope.value = 0;
        }
    };
});

app.controller('MainCtrl3', function($scope, $http) {

  	$scope.incrementValue = function() {
        if ($scope.value < $scope.maxValue) {
            $scope.value++;
        } else {
            $scope.value = 0;
        }
    };

    $http.get('api/incrementor/config').success(function(data) {
        $scope.value = data.initialValue;
        $scope.maxValue = data.maxValue;
    });
});

app.controller('ListLibrariesCtrl', function($scope, $location, restService) {
	restService.getAll().then(function(items) {
		$scope.libraries = items;
	});


	$scope.create = function() {
		restService.create($scope.newItemName).then(function (item) {
			$scope.libraries.push(item);
		});
	};

	$scope.goToDetails = function(library) {
		$location.path('/libraries/' + library.id + '/details');
	};

});

app.factory('restservice', function(){
	return{
		getAll: function(){

		},
		create: function(){

		}
	}
});

app.factory ('someService', function (){
	return {
		someAsyncCall: function (x){
			var deferred = $q.defer();
			$timeout(function(){
				deferred.resolve (x + '_async');
			}, 100);
			return deferred.promise;
		}
	};
});