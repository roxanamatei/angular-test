(function () {

    contactModule.directive("addcontactpopup", function () {
        var modal;
    return {
        restrict: "E",
        animation: false,
        controller: function ($scope, $rootScope, $uibModal) {
            var confirmUnsavedChanges = function () {
                return confirm("There are unsaved changes - would you like to save them?");
            };

            $scope.$on("openAddContactPopup", function (event) {
               modal = $uibModal.open({
                    templateUrl: "../Modules/Contact/templates/ContactAdd.html",
                    scope: $scope,
                    controller: ModalInstanceController,
                    windowClass: "app-modal-window"
               });
            });
        }
    }
    });

    function ModalInstanceController($scope, $rootScope, $uibModalInstance) {

        var closeModal = function () {
            $uibModalInstance.dismiss("cancel");
            };

            $scope.cancel = function () {
                closeModal();
            };
            $scope.$on("closeModal", function () {
                closeModal();
            });
    };

})();