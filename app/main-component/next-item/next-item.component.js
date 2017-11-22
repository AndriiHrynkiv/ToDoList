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
        if (a.byTime < b.byTime) {
            return a;
        }
        else {
            return b;
        }
    }

    $scope.$on('eventBroadcastedName', function (event, data) {
        vm.updatedList = data;
        vm.near = vm.updatedList.filter(function (x) {
            return x.Done === false;
        });
        vm.nextItem = vm.near.reduce(getNearItem);
        $scope.$apply();
    });
}




