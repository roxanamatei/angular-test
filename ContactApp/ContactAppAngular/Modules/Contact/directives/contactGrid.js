"use strict";

contactModule.directive("contactgrid", function (uiGridConstants) {
    return {
        restrict: "E",
        replace: true,
        template: "<div><div class=\"grid\" ui-grid=\"gridOptions\" ui-grid-edit ui-grid-cellnav></div></div>",
        scope: {
            gridData: "=",
            totalCount: "=",
            periodList: "="
        },
        controller: function ($scope, $rootScope, contactFactory) {

            $scope.gridOptions = {
                data: "gridData",
                enableFiltering: true,
                useExternalSorting: false,
                enableRowSelection: false,
                multiSelect: true,
                enableRowHeaderSelection: true,
                enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
                enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                columnDefs: [
                   
                    {
                        field: "firstName",
                        displayName: "First Name",
                        enableSorting: true,
                        enableColumnMenu: false,
                        cellTemplate: "<div class=\"ui-grid-cell-contents\"><span class=\"cursor contact-name\" >{{COL_FIELD}}</span></div>",
                        sort: {
                            direction: uiGridConstants.ASC
                        }

                    },
                    {
                        field: "lastName",
                        displayName: "Last Name",
                        enableSorting: true,
                        enableCellEdit: true,
                        enableColumnMenu: false,
                        cellTemplate: "<div class=\"ui-grid-cell-contents\"><span class=\"cursor contact-name\" >{{COL_FIELD}}</span></div>",
                        sort: {
                            direction: uiGridConstants.ASC
                        }
                    },
                    {
                        field: "email",
                        displayName: "Email",
                        enableCellEdit: true,
                        enableSorting: true,
                        enableColumnMenu: false,
                        cellTemplate: "<div class=\"ui-grid-cell-contents\"><span class=\"cursor contact-name\" >{{COL_FIELD}}</span></div>",
                        sort: {
                            direction: uiGridConstants.ASC
                        }
                    },
                    {
                        field: "phoneNumber",
                        displayName: "Phone Number",
                        enableFiltering: true,
                        enableSorting: true,
                        enableColumnMenu: false,
                        enableCellEdit: true,
                        cellTemplate: "<div class=\"ui-grid-cell-contents\"><span class=\"cursor contact-name\">{{COL_FIELD|tel}}</span></div>",
                        sort: {
                            direction: uiGridConstants.ASC
                        }

                    },
                    {
                        field: "gender",
                        displayName: "Gender",
                        enableCellEdit: true,
                        enableSorting: true,
                        enableColumnMenu: false,
                        cellTemplate: "<div class=\"ui-grid-cell-contents\"><span class=\"cursor contact-name\" >{{COL_FIELD}}</span></div>",
                        sort: {
                            direction: uiGridConstants.ASC
                        }
                    },
                    {
                        field: "birthay",
                        displayName: "Birthdate",
                        enableCellEdit: true,
                        enableSorting: true,
                        enableColumnMenu: false,
                        type: 'date', 
                        cellTemplate: "<div class=\"ui-grid-cell-contents\"><span class=\"cursor contact-name\" >{{COL_FIELD | date:'yyyy-MMM-dd'}}</span></div>",
                        cellFilter: 'date:\'yyyy-MM-dd\'',
                        sort: {
                            direction: uiGridConstants.ASC
                        }
                    },
                    {
                        field: "actions",
                        displayName: "",
                        pinnedLeft: true,
                        enableFiltering: false,
                        enableColumnMenu: false,
                        enableCellEdit: false,
                        width: 85,
                        footerCellTemplate: "<div class=\"cell-contents ui-grid-cell-contents\" col-index=\"renderIndex\"></div>",
                        cellTemplate: "<div class=\"ui-grid-cell-contents\">" +
                            "<img class=\"cursor pull-left details\" src=\"../Content/images/save_icon.gif\" ng-click=\"grid.appScope.saveContact(row.entity)\" uib-tooltip=\"Save changes\"></img>" +
                            "<img class=\"cursor pull-left details\" src=\"../Content/images/pencil_14px.png\" ng-click=\"grid.appScope.editContact(row.entity)\" uib-tooltip=\"Edit\"></img>" +
                            "<a ng-href='#/details/{{row.entity.id}}/mode/view?'>" +
                            "<img alt=\"some_text\" class=\"cursor pull-right details\" src=\"../Content/images/detail.png\"  uib-tooltip=\"Details\"></a>" +
                            "<img class=\"cursor pull-right details\" src=\"../Content/images/icon-er-close.png\" ng-click=\"grid.appScope.removeContact(row.entity)\" uib-tooltip=\"Remove\"></img>" +
                            "</div>"
                    }

                ],
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                        sortColumns.forEach(function (sortColumn) {
                            sortColumn.sort.priority = null;
                        });
                    });
                }
            };

            $scope.$watch("gridData", function (newVal) {
                if (newVal && $scope.gridOptions.data.length > 0) {
                    $scope.gridOptions.data = $scope.gridData;
                }
            });

            $scope.$on("clearGridData", function (){
                $scope.gridOptions.data.length = 0;
            });

            $scope.editContact = function (entity) {
                $scope.loading = true;
                var cust = entity;
                cust.birthay = new Date(cust.birthay);
                $rootScope.$broadcast("openAddContactPopup");
                $rootScope.editContactModel(entity);
            };

            $scope.saveContact = function (entity) {
                $scope.loading = true;
                var cust = entity;
                cust.birthay = new Date(cust.birthay);
                contactFactory.updateContact(cust).success(function (data) {
                    toastr.success("\"" + entity.firstName + "\" was saved successfully.");
                    cust.editMode = false;
                    $scope.loading = false;
                }).error(function (data) {
                    $scope.error = "An Error has occurred while Saving contact! " + data.ExceptionMessage;
                    $scope.loading = false;
                });

            };

            var reloadContacts = function () {
                contactFactory.getContacts().success(function (data) {
                    $scope.gridData = data;
                    $scope.loading = false;
                })
                   .error(function (data) {
                       $scope.error = "An Error has occurred while loading contacts! " + data.ExceptionMessage;
                       $scope.loading = false;
                   });
            };

            $scope.removeContact = function (entity) {
                $scope.loading = true;
                var currentContact = entity;

                contactFactory.deleteContact(currentContact).success(function (data) {

                    toastr.success("Deleted Successfully!!");
                    $scope.$broadcast("clearGridData");
                    reloadContacts();

                }).error(function (data) {
                    $scope.error = "An Error has occurred while Saving contact! " + data.ExceptionMessage;
                    $scope.loading = false;
                });
            };

            $scope.$on("removeContact", function (event, entity) {
                removeContact(employeeId, entity);
            });

            $scope.$on("editContact", function (event, entity) {
                editContact(employeeId, entity);
            });
        }
    };
});