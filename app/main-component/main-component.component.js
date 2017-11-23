angular.
    module('toDoList').
    component('mainComponent', {
        templateUrl: 'main-component/main-component.html',
        controller: ('collectComponents', ['$scope', collectComponents]),
        controllerAs: 'vm'
    });

function collectComponents($scope) {

    var vm = this;

    if (!localStorage.key('todoList')) {// this check better to move to the $onInit method of component;
        vm.storageList = [];
    } else { vm.storageList = JSON.parse(localStorage.getItem('todoList')); }


    vm.filterListbyTime = function () { // you dont't use this function on template, so please remove it from vm and rename to more clear name like 

        vm.currentHours = (new Date().getHours());
        vm.currentMinutes = (new Date().getMinutes());
        var getNewArray = function (x) {
            vm.itemHours = new Date(x.byTime);
            if (vm.itemHours.getHours() === vm.currentHours && vm.itemHours.getMinutes() < vm.currentMinutes) {
                x.Done = true;
                return x;
            } else if (vm.itemHours.getHours() < vm.currentHours) { // you can combine this line with first check;
                x.Done = true;
                return x;
            } else { return x; } // you can return x on the end of all check one time;
        };

        function getNearItem(x, y) {
            return x.byTime > y.byTime;
        }

        vm.itemsList = vm.storageList.map(getNewArray);
        vm.sortedList = vm.itemsList.sort(getNearItem); // we can sort list directly using angular filter;

        localStorage.setItem('todoList', JSON.stringify(vm.sortedList)); // logic with manipulating with storage beetter to move to the separeta func;
        vm.storageList = JSON.parse(localStorage.getItem('todoList')); // what do you achive on this line? 
        return vm.storageList; // why do we need return it?
    };


    vm.Data = function (item) { // rename this to better name;

        vm.item = item;
        vm.storageList.push(item);
        vm.filterListbyTime(); // it's not necessary anymore;

    };

    setInterval(function () { // move this logic to some var and dont forget to clear this interval on the $onDestroy method to prevent memory leaks;
        // vm.previousList = JSON.parse(localStorage.getItem('todoList'));
        vm.filterListbyTime();
        //if (!(angular.equals(vm.previousList, vm.storageList))) {
        $scope.$broadcast('eventBroadcastedName', vm.storageList);
        // }
    }, 1000); // it's better to increase this time;

}


