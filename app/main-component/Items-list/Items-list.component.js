angular.
    module('toDoList').
    component('itemsList', {
        bindings: {
            list: '<'
        },
        templateUrl: 'main-component/items-list/items-list.component.html',
        controller: ('CreateItemsList', ['$scope', CreateItemsList]),
        controllerAs: 'vm'
    });


function CreateItemsList($scope) {

    var vm = this;
    vm.updatedList = vm.list;
    
    $scope.$on('eventBroadcastedName', function (event, data) {
        vm.updatedList = data;
        $scope.$apply();
    });

    vm.sortBy = function (propertyName) {
        vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
        vm.propertyName = propertyName;
    };

    vm.removeData = function (x) {
        vm.updatedList.splice(x, 1);
        localStorage.clear();
        localStorage.setItem('todoList', JSON.stringify(vm.updatedList));
    };
}




