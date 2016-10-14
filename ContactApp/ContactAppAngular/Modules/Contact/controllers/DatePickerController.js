contactModule.controller('DatePickerController', function ($scope, $http) {

    $scope.formData = {};
    $scope.formData.date = "";
    $scope.opened = false;

    //Datepicker
    $scope.dateOptions = {
        'year-format': "'yy'",
        'show-weeks': false
    };
});


