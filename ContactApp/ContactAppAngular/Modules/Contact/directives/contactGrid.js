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
        controller: function ($scope, contactFactory) {

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
                        field: "id",
                        displayName: "Contact ID",
                        enableFiltering: false,
                        enableSorting: true,
                        enableColumnMenu: false,
                        cellTemplate: "<div class=\"ui-grid-cell-contents\"><span class=\"cursor contact-name\" >{{COL_FIELD}}</span></div>",
                        sort: {
                            direction: uiGridConstants.ASC
                        }

                    },
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
                        field: "birthay",
                        displayName: "Birthdate",
                        enableCellEdit: true,
                        enableSorting: true,
                        enableColumnMenu: false,
                        type: 'date', 
                        cellTemplate: "<div class=\"ui-grid-cell-contents\"><span class=\"cursor contact-name\" >{{COL_FIELD | date:'yyyy MMM dd'}}</span></div>",
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
                        width: 60,
                        footerCellTemplate: "<div class=\"cell-contents ui-grid-cell-contents\" col-index=\"renderIndex\"></div>",
                        cellTemplate: "<div class=\"ui-grid-cell-contents\">" +
                            "<img class=\"cursor pull-left\" src=\"../Content/images/save_icon.gif\" ng-click=\"grid.appScope.editContact(row.entity)\"></img>" +
                            "<img class=\"cursor pull-left\" src=\"../Content/images/pencil_14px.png\" ng-click=\"grid.appScope.editContact(row.entity)\"></img>" +
                            "<img class=\"cursor pull-right\" src=\"../Content/images/icon-er-close.png\" ng-click=\"grid.appScope.removeContact(row.entity)\"></img>" +
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

            $scope.$on("clearGridData", function () {
                $scope.gridOptions.data.length = 0;
            });

            $scope.editContact = function (entity) {
                $scope.loading = true;
                var cust = entity;
                contactFactory.updateContact(cust).success(function (data) {
                    toastr.success("\"" + entity.firstName + "\" was edited successfully.");
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