
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

    vm.fromForm = function () { // 1) please rename this to more clear name like onSubmit;
        // 2) you should use angular form validation and show separete error for each field;
        if (vm.personName === undefined || vm.Phone === undefined || vm.byTime === null) { // you can use shortact there vm.personName || vm.Phone...
            vm.error = 'Please fill all fields';
            return;
        } else { vm.error = ''; }

        var checPhone = /^(\+|00)(\d|\()(\d|\,|\-|\)|\s){7}(\d|\s)+$/g.test(vm.Phone); // use ng-patern for this;
        var PhoneChekcPart = vm.Phone.slice(2, 8); // rename this to camelCase;
        var testExpresin = /(\,|\-)/g; // rename this;

        if (checPhone === false) { // all logick with checking phone to the separete func;
            vm.error = 'Please enter correct phone number';
            return;
        } else { vm.error = ''; }

        if (PhoneChekcPart.match(testExpresin) && PhoneChekcPart.match(testExpresin).length > 1) {
            vm.error = 'Please enter correct phone number';
            return;
        } else { vm.error = ''; }

        vm.items = { // all properties should be only in camelCase;
            personName: vm.personName,
            Phone: (((vm.Phone).replace(/\+/, '00')).replace(/(\(|\)|-)/g, '')),
            byTime: vm.byTime,
            Delete: '', // we dont't need this property;
            Done: false
        };
        vm.data({ item: vm.items });

        vm.items = { // this should move to separete reset func;
            personName: vm.personName = '',
            Phone: vm.Phone = '',
            byTime: vm.byTime = null,
            Delete: '',
            Done: false
        };
    }
}