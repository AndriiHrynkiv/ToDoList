(function () {
    angular.
        module('toDoList').
        component('mainComponent', {
            templateUrl: 'main-component/main-component.html',
            controller: ('collectComponents', ['$scope', '$interval', collectComponents]),
            controllerAs: 'vm'
        });

    function collectComponents($scope, $interval) {
        var vm = this;

        vm.$onInit = function () {
            if (!localStorage.key('todoList')) {
                vm.storageList = [];
            } else {
                vm.storageList = angular.fromJson(localStorage.getItem('todoList')); 
            }
        };

        function sentListToLocalStorage() {
            localStorage.setItem('todoList', angular.toJson(vm.sortedList));
            vm.storageList = angular.fromJson(localStorage.getItem('todoList'));
        }

        function sortByTime(x, y) {
            return x.byTime > y.byTime;
        }

        function checkItemsDoneState() {
            vm.currentHours = (new Date().getHours());
            vm.currentMinutes = (new Date().getMinutes());

            var getNewArray = function (x) {
                vm.itemHours = new Date(x.byTime);
                if ((vm.itemHours.getHours() < vm.currentHours) || (vm.itemHours.getHours() === vm.currentHours && vm.itemHours.getMinutes() < vm.currentMinutes)) {
                    x.Done = true;
                }
                return x;
            };
            vm.itemsList = vm.storageList.map(getNewArray);
            vm.sortedList = vm.itemsList.sort(sortByTime);
        }

        function updateLocalStorage(index) {
            var updatedList = vm.storageList.splice(index, 1);
            localStorage.clear();
            localStorage.setItem('todoList', angular.fromJson(updatedList));
        }

        vm.removeData = function (index) {
            updateLocalStorage(index);
        };

        var monitoringListByTime = $interval(function () {
            // vm.previousList = JSON.parse(localStorage.getItem('todoList'));
            checkItemsDoneState();
            sentListToLocalStorage();
            //   if (!(angular.equals(vm.previousList, vm.storageList))) {
            $scope.$broadcast('sentUpdatedbyTimeList', vm.storageList);
            // }
        }, 2000);

        vm.addItemtoList = function (itemToAdd) {
            vm.itemToAdd = itemToAdd;
            vm.storageList.push(itemToAdd);
            checkItemsDoneState();
            sentListToLocalStorage();

        };

        vm.$onDestroy = function () {
            clearInterval(monitoringListByTime);
        };
    }
})();


