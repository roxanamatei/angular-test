(function () {
    var app = angular.module('contact-store', []);

    app.directive('contactAdd', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Content/Templates/contact-add.html'
        };
    });

    app.directive('contactList', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Content/Templates/contact-list.html'
        };
    });

})();