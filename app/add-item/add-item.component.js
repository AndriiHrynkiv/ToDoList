angular.
module('addItem').
component('addItem', {
    templateUrl: 'add-item/add-item.template.html',
    controller:['$scope', function CollectFormsData($scope) {

   if (!localStorage.key('todoList')){
    $scope.todoList =  [];
    } else { $scope.todoList = JSON.parse(localStorage.getItem('todoList'))}
    
      $scope.addData = function () {

        if ( $scope.personName === undefined || $scope.Phone === undefined || $scope.byTime  === null) {
            $scope.error ="Please fill all fields";
            return;
        } else {$scope.error=""}

     var checPhone = /^(\+|00)(\d|\()(\d|\,|\-|\)|\s){7}(\d|\s)+$/g.test($scope.Phone);
     var PhoneChekcPart = $scope.Phone.slice(2, 8);
     var testExpresin = /(\,|\-)/g;

       if ( checPhone === false){
          $scope.error="Please enter correct phone number";
          return;
      } else {$scope.error=""}

      if (PhoneChekcPart.match(testExpresin) && PhoneChekcPart.match(testExpresin).length > 1) {   
            console.log(PhoneChekcPart.match(test2).length)  ;
            $scope.error="Please enter correct phone number";
            return; 
      } else {$scope.error=""}
      
              $scope.todoList.push({
                                  personName:$scope.personName, 
                                  Phone:((($scope.Phone).replace(/\+/, "00")).replace(/(\(|\)|-)/g, "")),
                                  byTime:$scope.byTime,
                                  Delete:"",
                                  Done:false
                              }); 
                              
       }

         $scope.sortBy = function(propertyName) {
            $scope.propertyName = propertyName;
          };

        $scope.removeData = function (x) {  
            localStorage.removeItem(x);
            $scope.todoList.splice(x, 1);  
        };

        var cheked = document.querySelector('.main2').addEventListener('click', function(e) {
            localStorage.setItem('todoList', JSON.stringify($scope.todoList));        
        });
    
        
         $scope.currentHours = (new Date().getHours());
         $scope.currentMinutes = (new Date().getMinutes());

         $scope.unfinishedItems =  $scope.todoList.filter(function(x){
           return x.Done === false;
          });

         $scope.nextItem = $scope.unfinishedItems.filter(function(y){
            var itemHours = new Date(y.byTime);
            if (itemHours.getHours() === $scope.currentHours) {
                      return itemHours.getMinutes() >  $scope.currentMinutes;
                } else {
                      return itemHours.getHours() >  $scope.currentHours;
                    }
          });
          if ($scope.nextItem.length != 0 ) {
              $scope.near = $scope.nextItem.reduce(function(a, b){
                  if (a.byTime < b.byTime) {
                    return a;
                  } 
                    else {
                      return b;
                    }
                  })  
          }   
        }
    ]
});

