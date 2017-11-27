(function () {
    angular.
        module('toDoList').
        component('itemsList', {
            bindings: {
                list: '<',
                deleteData: '&'
            },
            templateUrl: 'main-component/items-list/items-list.component.html',
            controller: ('createItemsList', ['$scope', createItemsList]),
            controllerAs: 'vm'
        });


    function createItemsList($scope) {
        var vm = this;
        
        $scope.$on('sentUpdatedbyTimeList', function (event, data) {
            vm.updatedList = data;
            $scope.$apply();
        });

        vm.sortBy = function(propertyName) {
            vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
            vm.propertyName = propertyName;
        };
    }
})();
