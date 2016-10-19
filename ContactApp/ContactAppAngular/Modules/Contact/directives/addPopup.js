(function () {

    contactModule.directive("addcontactpopup", function () {
        var modal;
    return {
        restrict: "E",
        animation: false,
        controller: function ($scope, $rootScope, $uibModal) {
            debugger;
            var confirmUnsavedChanges = function () {
                return confirm("There are unsaved changes - would you like to save them?");
            };

            $rootScope.$on("openAddContactPopup", function (event) {
                debugger;
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
            debugger;
            $uibModalInstance.dismiss("cancel");
            $('body').removeClass('modal-open');
            //$('.modal-backdrop').remove();
            };

            $scope.cancel = function () {
                closeModal();
            };
            $scope.$on("closeModal", function () {
                closeModal();
            });
    };

})();