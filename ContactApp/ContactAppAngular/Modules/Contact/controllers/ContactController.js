(function () {

    contactModule.controller('ContactsController', ['$scope', '$rootScope', 'contactFactory', 'contactManager', 'requestManager',
                                           function ($scope, $rootScope, contactFactory, contactManager, requestManager)
 {
    $scope.contacts = [];
    $scope.loading = true;
    $scope.addMode = true;

    $scope.toggleedit = function () {
        this.contact.editMode = !this.contact.editMode;
    };

    $scope.go = function (path) {
        debugger;
        $location.path(path);
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
        this.newcontact.city = "";
        this.newcontact.country = "";
        this.newcontact.photo = "";
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

    $scope.opened = false;

    //Datepicker
    $scope.dateOptions = {
        'year-format': "'yy'",
        'show-weeks': false
    };

 //-----Persist Contact-----------------------------------------------------------------------------------------------//
    var createAddContactRequest = function () {
        var returnValue = model.newcontact;
        return returnValue;
    };

    var attemptToSaveContact = function (request) {
        return requestManager.attemptToCallOperation(function () {
            return contactManager.addContact(request);
        });
    };

    var saveContact = function (model, successCallback, errorCallback) {
        requestManager.callOperation(
            function () {
                debugger;
                 var request = createAddContactRequest();
                 return attemptToSaveContact(request);    
            },
            successCallback,
            null,
            function (response) {
                var errorMessage;
                errorMessage = 'Failure to save the contact.';
                toastr.error(errorMessage, 'Validation Error');
                $scope.loading = false;
                $scope.$broadcast("closeModal");
                if (!errorCallback) return;
                errorCallback(response);
            }
        );
    };

    var validateAndSaveContact = function (event, successCallback) {

        saveContact($scope.model, function (response) {
            debugger;
            toastr.success("Added Successfully!!");
            $scope.addMode = false;
            $scope.contacts.push(model.newcontact);
            $scope.loading = false;
            $scope.$broadcast("closeModal");

            if (successCallback) {
               
                successCallback();
            }
        }, function (response) {
        });
    };

    $scope.add = function (event) {
        debugger;
        $scope.model.newcontact = this.newcontact;
             validateAndSaveContact(event);
         };

   
//-----Get Contact list-----------------------------------------------------------------------------------------------//

         var createGetContactListRequest = function () {
           var returnValue = {
            skip: model.offset,
            take: model.range,
        };
        return returnValue;
    };

    var attemptToGetContactList = function (request) {
        return requestManager.attemptToCallOperation(function () {
            return contactManager.getContactList(request);
        });
    };

    var getContactList = function (successCallback) {
        requestManager.callOperation(
            function () {
                var request = createGetContactListRequest();
                return attemptToGetContactList(request);
            },
            successCallback,
            function () {
                getContactList(successCallback);
            }
        );
    };

    var loadContactList = function (successCallback) {
        getContactList(function (response) {
            if (model.contactList == null) {
                model.start = 1;
                if (response.contactList && response.contactList.length > 0) {
                    model.contactList = response.contactList;
                    $scope.loading = false;
                    debugger;
                    $scope.contacts = response.contactList;
                    model.totalFilteredCount = response.totalFilteredCount;
                }
            } else if (response.contactList.length > 0) {
                model.contactList = model.contactList.concat(response.contactList);
                $scope.contacts = model.contactList;
                model.totalFilteredCount = response.totalFilteredCount;
            }

            model.isGridEmpty = model.contactList == null || model.contactList.length == 0;
          
            if (!successCallback) return;
            successCallback();
        });
    };

    $scope.$on('loadMoreContacts', function () {
        if (model.offset >= model.totalFilteredCount) return;

        model.start += 1;
        model.offset = (model.start - 1) * model.range;

        loadContactList(function () {
            $scope.$broadcast('moreContactsLoaded');
        });
    });

    var model = {
        isGridEmpty: false,     
        contactList: null,
        start: 0,
        range: 20,
        offset: 0,
        totalFilteredCount: 0,
        newcontact: {}
    };

    $scope.model = model;
    $scope.model.newcontact = this.newcontact;

    loadContactList();

}]);

})();