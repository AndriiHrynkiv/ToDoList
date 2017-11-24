
angular.
    module('toDoList').
    component('addItem', {
        bindings: {
            data: '&'
        },
        templateUrl: 'main-component/add-item/add-item.template.html',
        controller: ('CollectFormsData', CollectFormsData),
        controllerAs: 'vm'
    });

function CollectFormsData() {

    var vm = this;

    vm.cleanForm = function () {
        vm.items = {
            personName: vm.personName = '',
            Phone: vm.Phone = '',
            byTime: vm.byTime = null,
            Done: false
        };
    };

    vm.onSubmit = function () {

        if (Data.$invalid || !vm.personName || !vm.Phone || !vm.byTime) {
            return;
        }

        vm.items = {
            personName: vm.personName,
            Phone: (((vm.Phone).replace(/\+/, '00')).replace(/(\(|\)|-)/g, '')),
            byTime: vm.byTime,
            Done: false
        };

        vm.data({ item: vm.items });

        vm.cleanForm();
    };
}