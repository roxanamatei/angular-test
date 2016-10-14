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

    contactModule.directive("datepicker", function () {
        return {
            restrict: "E",
            scope: {
                ngModel: "=",
                dateOptions: "=",
                opened: "=",
            },
            link: function ($scope, element, attrs) {
                $scope.open = function (event) {
                    console.log("open");
                    event.preventDefault();
                    event.stopPropagation();
                    $scope.opened = true;
                };

                $scope.clear = function () {
                    $scope.ngModel = null;
                };
            },
            templateUrl: '../Modules/Contact/templates/DatePicker.html'
        }
    })

})();