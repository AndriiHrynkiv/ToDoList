
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

    vm.fromForm = function () {

        if (vm.personName === undefined || vm.Phone === undefined || vm.byTime === null) {
            vm.error = 'Please fill all fields';
            return;
        } else { vm.error = ''; }

        var checPhone = /^(\+|00)(\d|\()(\d|\,|\-|\)|\s){7}(\d|\s)+$/g.test(vm.Phone);
        var PhoneChekcPart = vm.Phone.slice(2, 8);
        var testExpresin = /(\,|\-)/g;

        if (checPhone === false) {
            vm.error = 'Please enter correct phone number';
            return;
        } else { vm.error = ''; }

        if (PhoneChekcPart.match(testExpresin) && PhoneChekcPart.match(testExpresin).length > 1) {
            vm.error = 'Please enter correct phone number';
            return;
        } else { vm.error = ''; }

        vm.items = {
            personName: vm.personName,
            Phone: (((vm.Phone).replace(/\+/, '00')).replace(/(\(|\)|-)/g, '')),
            byTime: vm.byTime,
            Delete: '',
            Done: false
        };
        vm.data({ item: vm.items });

        vm.items = {
            personName: vm.personName = '',
            Phone: vm.Phone = '',
            byTime: vm.byTime = null,
            Delete: '',
            Done: false
        };
    }
}