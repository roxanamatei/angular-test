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


})();