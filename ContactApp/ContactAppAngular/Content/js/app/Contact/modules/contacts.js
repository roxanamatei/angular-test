(function () {

    contactModule.directive('contactAdd', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Content/Templates/contact-add.html'
        };
    });

    contactModule.directive('contactList', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Content/Templates/contact-list.html'
        };
    });


})();