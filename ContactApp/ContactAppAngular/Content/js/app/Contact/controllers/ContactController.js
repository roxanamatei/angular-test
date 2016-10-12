(function () {

    contactModule.controller('ContactsController', ['$scope', 'contactFactory', function ($scope, contactFactory) {
    $scope.contacts = [];
    $scope.loading = true;
    $scope.addMode = false;
    debugger;


    $scope.toggleedit = function () {
        this.contact.editMode = !this.contact.editMode;
    };
    $scope.toggleAdd = function () {
        debugger;
        $scope.addMode = !$scope.addMode;
        if ($scope.addMode === true)
            $scope.$broadcast("openAddContactPopup");
        else
            $scope.$broadcast("closeModal");
    };


    // Save Customer Event
    $scope.save = function () {
        $scope.loading = true;
        var cust = this.contact;
        contactFactory.updateContact(cust).success(function (data) {
            toastr.success("Saved Successfully!!");
            cust.editMode = false;
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occurred while Saving contact! " + data.ExceptionMessage;
            $scope.loading = false;

        });
    };

    // add Customer Event
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
    // delete contact Event
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
        $scope.loading = false;
    })
    .error(function (data) {
        $scope.error = "An Error has occurred while loading posts! " + data.ExceptionMessage;
        $scope.loading = false;
    });

}]);

})();