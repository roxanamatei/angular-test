//(function () {

//    contactModule.directive("addcontactpopup", function () {
//    var modal;

//    return {
//        restrict: "E",
//        controller: function ($rootScope, $scope, $modal, $q, $filter, $window) {
            
//            var confirmUnsavedChanges = function () {
//                return confirm("There are unsaved changes - would you like to save them?");
//            };

//            $scope.$on("openAddContactPopup", function () {
//                debugger;
//                modal = $modal.open({
//                    templateUrl: "../Content/Templates/contact-add.html",
//                    scope: $scope,
//                    controller: function ($modalInstance) {

//                        var closeModal = function () {
//                            $modalInstance.dismiss("cancel");
                           
//                        };

//                        $scope.cancel = function () {
//                              closeModal();
//                        };
//                        $scope.$on("closeModal", function () {
//                            closeModal();
//                        });
//                    },
//                    windowClass: "app-modal-window"
//                });
//            });
//        }
//    }
//});

//})();