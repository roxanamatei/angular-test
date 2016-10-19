(function () {

    contactModule.controller('ContactsController', ['$scope', '$rootScope', 'contactFactory', function ($scope, $rootScope, contactFactory) {
    $scope.contacts = [];
    $scope.loading = true;
    $scope.addMode = true;

    $scope.toggleedit = function () {
        this.contact.editMode = !this.contact.editMode;
    };

    $scope.clear = function () {

        if (this.newcontact == undefined) return;

        this.newcontact.firstName = "";
        this.newcontact.lastName = "";
        this.newcontact.email = "";
        this.newcontact.gender = "";
        this.newcontact.birthay = "";
        this.newcontact.description = "";
        this.newcontact.phoneNumber = "";
    };

    $scope.openAdd = function () {
        $scope.addMode = true;
        $scope.clear();
        debugger;
        $rootScope.$broadcast("openAddContactPopup");
    };

    $scope.closeModal = function () {
        $scope.$broadcast("closeModal");
        $scope.loading = false;

    };

    $rootScope.editContactModel = function (obj) {
        this.newcontact = angular.copy(obj);
        $scope.addMode = false;
        $scope.loading = false;
    };

    $scope.save = function () {
        $scope.loading = true;
        var cust = this.newcontact;
        contactFactory.updateContact(cust).success(function (data) {       
            toastr.success("Saved Successfully!!");
            cust.editMode = false;
            $scope.loading = false;
            $scope.$broadcast("closeModal");
        }).error(function (data) {
            $scope.error = "An Error has occurred while Saving contact! " + data.ExceptionMessage;
            $scope.loading = false;

        });
    };

    $scope.add = function () {
        $scope.loading = true;
        contactFactory.addContact(this.newcontact).success(function (data) {
            toastr.success("Added Successfully!!");
            $scope.addMode = false;
            $scope.contacts.push(data);
            $scope.loading = false;
            $scope.$broadcast("closeModal");
        }).error(function (data) {
            $scope.error = "An Error has occurred while Adding contact! " + data.ExceptionMessage;
            $scope.loading = false;

        });
    };

    $scope.delcontact = function () {
        $scope.loading = true;
        var currentContact = this.contact;
        contactFactory.deleteContact(currentContact).success(function (data) {
            toastr.success("Deleted Successfully!!");
            $.each($scope.contacts, function (i) {
                if ($scope.contacts[i].id === currentContact.id) {
                    $scope.contacts.splice(i, 1);
                    return false;
                }
            });
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occurred while Saving contact! " + data.ExceptionMessage;
            $scope.loading = false;

        });
    };

    //get all Contacts- Self Calling -On load
    contactFactory.getContacts().success(function (data) {
        $scope.contacts = data;
        $scope.totalCount = $scope.contacts.totalCount;
        $scope.loading = false;
    })
    .error(function (data) {
        $scope.error = "An Error has occurred while loading posts! " + data.ExceptionMessage;
        $scope.loading = false;
    });

    $scope.opened = false;

    //Datepicker
    $scope.dateOptions = {
        'year-format': "'yy'",
        'show-weeks': false
    };

}]);

})();