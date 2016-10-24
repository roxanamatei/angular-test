﻿(function () {

    contactModule.directive('contactAdd', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Moldules/Contact/templates/ContactAdd.html'
        };
    });

    contactModule.directive('contactList', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Modules/Contact/templates/ContactList.html'
        };
    });
    contactModule.directive('contactHeader', function () {
        return {
            restrict: 'E',//element directive
            templateUrl: '../Modules/Contact/templates/Header.html'
        };
    });


    contactModule.directive("datepicker", function () {
        return {
            restrict: "E",
            scope: {
                dateOptions: "=",
                opened: "=",
                birthday: "="
            },
            link: function ($scope, element, attrs) {
                $scope.open = function (event) {
                    console.log("open");
                    event.preventDefault();
                    event.stopPropagation();
                    $scope.opened = true;
                };

                $scope.clear = function () {
                    $scope.birthday = null;
                };
            },
            templateUrl: '../Modules/Contact/templates/DatePicker.html'
        }
    });

    contactModule.directive("fileread", [
      function () {
          return {
              scope: {
                  fileread: "="
              },
              link: function (scope, element, attributes) {
                  element.bind("change", function (changeEvent) {
                      debugger;
                      var reader = new FileReader();
                      reader.onload = function (loadEvent) {
                          scope.$apply(function () {
                              debugger;
                              scope.fileread = loadEvent.target.result;
                          });
                      }
                      reader.readAsDataURL(changeEvent.target.files[0]);
                  });
              }
          }
      }
    ]);

})();