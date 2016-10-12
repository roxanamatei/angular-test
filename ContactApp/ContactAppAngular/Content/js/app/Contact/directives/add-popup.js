(function () {

    contactModule.directive("addcontactpopup", function () {
    var modal;

    return {
        restrict: "E",
        controller: function ($scope, $uibModal) {
            
            var confirmUnsavedChanges = function () {
                return confirm("There are unsaved changes - would you like to save them?");
            };

            $scope.$on("openAddContactPopup", function () {
                debugger;
               var modal = $uibModal.open({
                    templateUrl: "../Content/Templates/contact-add.html",
                    scope: $scope,
                    controller: ModalInstanceController,
                    windowClass: "app-modal-window"
                });
            });
        }
    }
    });

    function ModalInstanceController($scope, $uibModalInstance) {

        var closeModal = function () {
                debugger;
                $uibModalInstance.dismiss("cancel");
            };

            $scope.cancel = function () {
                closeModal();
            };
            $scope.$on("closeModal", function () {
                debugger;
                closeModal();
            });
    };

})();