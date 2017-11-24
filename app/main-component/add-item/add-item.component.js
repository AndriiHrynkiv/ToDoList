
angular.
    module('toDoList').
    component('addItem', {
        bindings: {
            data: '&'
        },
        templateUrl: 'main-component/add-item/add-item.template.html',
        controller: ('collectFormsData', collectFormsData),
        controllerAs: 'vm'
    });

function collectFormsData() {

    var vm = this;

    vm.cleanForm = function () {
        vm.itemToAdd = {
            personName: vm.personName = '',
            Phone: vm.Phone = '',
            byTime: vm.byTime = null,
            Done: false
        };
    };

    vm.onSubmit = function (form) {

        if (form.$invalid) {
            return;
        }

        vm.itemToAdd = {
            personName: vm.personName,
            Phone: (((vm.Phone).replace(/\+/, '00')).replace(/(\(|\)|-)/g, '')),
            byTime: vm.byTime,
            Done: false
        };

        vm.data({ itemToAdd: vm.itemToAdd });

        vm.cleanForm();
    };
}