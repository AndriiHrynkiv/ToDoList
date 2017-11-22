angular.
    module('toDoList').
    component('mainComponent', {
        templateUrl: 'main-component/main-component.html',
        controller: ('collectComponents', ['$scope', collectComponents]),
        controllerAs: 'vm'
    });

function collectComponents($scope) {

    var vm = this;

    if (!localStorage.key('todoList')) {
        vm.storageList = [];
    } else { vm.storageList = JSON.parse(localStorage.getItem('todoList')); }


    vm.filterListbyTime = function () {

        vm.currentHours = (new Date().getHours());
        vm.currentMinutes = (new Date().getMinutes());
        var getNewArray = function (x) {
            vm.itemHours = new Date(x.byTime);
            if (vm.itemHours.getHours() === vm.currentHours && vm.itemHours.getMinutes() < vm.currentMinutes) {
                x.Done = true;
                return x;
            } else if (vm.itemHours.getHours() < vm.currentHours) {
                x.Done = true;
                return x;
            }
            else { return x; }
        };
        vm.itemsList = vm.storageList.map(getNewArray);

        localStorage.setItem('todoList', JSON.stringify(vm.itemsList));
        vm.storageList = JSON.parse(localStorage.getItem('todoList'));
        return vm.storageList;
    };

    vm.Data = function (item) {
        vm.item = item;
        vm.storageList.push(item);
        vm.filterListbyTime();
    };

    setInterval(function () {
        vm.filterListbyTime();
        $scope.$broadcast('eventBroadcastedName', vm.storageList);
    }, 1000);
}


