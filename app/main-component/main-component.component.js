angular.
    module('toDoList').
    component('mainComponent', {
        templateUrl: 'main-component/main-component.html',
        controller: ('collectComponents', ['$scope', collectComponents]),
        controllerAs: 'vm'
    });

function collectComponents($scope) {

    var vm = this;

    vm.$onInit = function () {
        if (!localStorage.key('todoList')) {
            return vm.storageList = [];
        } else { return vm.storageList = JSON.parse(localStorage.getItem('todoList')); }
    };

    var sentListToLocalStorage = function () {
        localStorage.setItem('todoList', JSON.stringify(vm.sortedList));
    };

    var checkItemsDoneState = function () {

        vm.currentHours = (new Date().getHours());
        vm.currentMinutes = (new Date().getMinutes());

        var getNewArray = function (x) {
            vm.itemHours = new Date(x.byTime);
            if ((vm.itemHours.getHours() < vm.currentHours) || (vm.itemHours.getHours() === vm.currentHours && vm.itemHours.getMinutes() < vm.currentMinutes)) {
                x.Done = true;
            }
            return x;
        };

        function getNearItem(x, y) {
            return x.byTime > y.byTime;
        }
        vm.itemsList = vm.storageList.map(getNewArray);
        vm.sortedList = vm.itemsList.sort(getNearItem);
        sentListToLocalStorage();
    };

    var updateLocalStorage = function (index) {
        var updatedList = vm.storageList.splice(index, 1);
        localStorage.clear();
        localStorage.setItem('todoList', JSON.stringify(updatedList));
    };

    vm.removeData = function (index) {
        updateLocalStorage(index);
    };


    var monitoringListByTime = setInterval(function () {
        // vm.previousList = JSON.parse(localStorage.getItem('todoList'));
        checkItemsDoneState();
        //   if (!(angular.equals(vm.previousList, vm.storageList))) {
        $scope.$broadcast('sentUpdatedbyTimeList', vm.storageList);
        // }
    }, 2000);

    vm.addItemtoList = function (item) {
        vm.item = item;
        vm.storageList.push(item);
        checkItemsDoneState();
    };

    vm.$onDestroy = function () {
        clearInterval(monitoringListByTime);
    };
}


