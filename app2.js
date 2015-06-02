var app2 = angular.module('app2', [])

app2.controller('MyCtrl', function($scope) {
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