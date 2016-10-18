(function () {

    contactModule.directive('contactAdd', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Moldules/Contact/templates/ContactAdd.html'
        };
    });

    contactModule.directive('contactList', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Modules/Contact/templates/ContactList.html'
        };
    });
    contactModule.directive('contactHeader', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Modules/Contact/templates/Header.html'
        };
    });


    contactModule.directive("datepicker", function () {
        return {
            restrict: "E",
            scope: {
                dateOptions: "=",
                opened: "=",
                birthday : "="
            },
            link: function ($scope, element, attrs) {
                $scope.open = function (event) {
                    debugger;
                    console.log("open");
                    event.preventDefault();
                    event.stopPropagation();
                    $scope.opened = true;
                };

                $scope.clear = function () {
                    debugger;
                    $scope.birthday = null;
                };
            },
            templateUrl: '../Modules/Contact/templates/DatePicker.html'
        }
    })

})();