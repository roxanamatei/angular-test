contactModule.controller('ContactDetailsController', ['$scope', '$rootScope', '$routeParams', 'contactFactory', 'modeTypes', '$http',
    function ($scope, $rootScope, $routeParams, contactFactory, modeTypes, $http) {


    var model = {
        isView: $routeParams.modeType == modeTypes.view,
        isEdit: $routeParams.modeType == modeTypes.edit,
        isAdd: $routeParams.modeType == modeTypes.add,
        isLoading: true,
        contactId: $routeParams.id,       
    };

    $scope.contact = [];
    $scope.loading = true;
    $scope.model = model;


    var loadContact = function () {

        contactFactory.getContactById($scope.model.contactId)
            .success(function (data) {
                $scope.contact = data;
        })
        .error(function (data) {
            $scope.error = "An Error has occurred while loading posts! " + data.ExceptionMessage;
            $scope.loading = false;
        });

    };

    if (model.isView || model.isEdit) {
        loadContact();
    }

    $scope.saveContact = function (imgBlob) {
        $scope.loading = true;
        var cust = this.contact;
        cust.birthay = new Date(cust.birthay);
        cust.photo = imgBlob;
        contactFactory.updateContact(cust).success(function (data) {
            toastr.success("Photo for \"" + cust.firstName + "\" was uploaded successfully.");
            cust.editMode = false;
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occurred while Saving changes! " + data.ExceptionMessage;
            $scope.loading = false;
        });

    };

    $scope.uploadImage = function (uploadme) {
        //var fd = new FormData();
        //var imgBlob = dataURItoBlob(uploadme);
        //fd.append('file', imgBlob);

        $scope.saveContact(uploadme);
    }

    //convert the dataURI
    function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: mimeString
        });
    }

}]);


