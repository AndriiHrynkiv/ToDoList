angular.
    module('toDoList').
    component('nextItem', {
        bindings: {
            filt: '<'
        },
        templateUrl: 'main-component/next-item/next-item.component.html',
        controller: ('showNextItem', ['$scope', showNextItem]),
        controllerAs: 'vm'
    });


function showNextItem($scope) {

    var vm = this;

    function getNearItem(a, b) {
        return ((a.byTime < b.byTime) ? a : b);
    }

    $scope.$on('sentUpdatedbyTimeList', function (event, data) {
        vm.updatedList = data;
        vm.near = vm.updatedList.filter(function (x) {
            return x.Done === false;
        });
        vm.nextItem = vm.near.reduce(getNearItem);
        $scope.$apply();
    });
}




