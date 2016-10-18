contactModule.controller('ContactDetailsController', ['$scope', '$rootScope', '$routeParams', 'contactFactory', 'modeTypes', function ($scope, $rootScope, $routeParams, contactFactory, modeTypes) {


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

        debugger;
        contactFactory.getContactById($scope.model.contactId)
            .success(function (data) {
            $scope.contact = data;
            debugger;
        })
        .error(function (data) {
            debugger;
            $scope.error = "An Error has occurred while loading posts! " + data.ExceptionMessage;
            $scope.loading = false;
        });

    };

    if (model.isView || model.isEdit) {
        loadContact();
    }
}]);