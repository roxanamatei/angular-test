
var app = angular.module('appContact', []);
var url = 'api/Customers';
app.factory('customerFactory', function ($http) {
    return {
        getCustomers: function () {
            return $http.get(url);
        },
        addCustomer: function (customer) {
            return $http.post(url, customer);
        },
        deleteCustomer: function (customer) {
            return $http.delete(url + "/"+ customer.customerID);
        },
        updateCustomer: function (customer) {
            return $http.put(url + "/" + customer.Id, customer);
        }
    };
});

app.controller('CustomersController', ['$scope', 'customerFactory', function ($scope, customerFactory) {
    $scope.customers = [];
    $scope.loading = true;
    $scope.addMode = false;

    $scope.toggleedit = function () {
        debugger;
        this.customer.editMode = !this.customer.editMode;
    };
    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
    };


    // Save Customer Event
    $scope.save = function () {
        $scope.loading = true;
        var cust = this.customer;
        customerFactory.updateCustomer(cust).success(function (data) {
            toastr.success("Saved Successfully!!");
            cust.editMode = false;
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occurred while Saving customer! " + data.ExceptionMessage;
            $scope.loading = false;

        });
    };

    // add Customer Event
    $scope.add = function () {
        $scope.loading = true;
        customerFactory.addCustomer(this.newcustomer).success(function (data) {
            toastr.success("Added Successfully!!");
            $scope.addMode = false;
            $scope.customers.push(data);
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occurred while Adding customer! " + data.ExceptionMessage;
            $scope.loading = false;

        });
    };
    // delete Customer Event
    $scope.delcustomer = function () {
        $scope.loading = true;
        var currentCustomer = this.customer;
        customerFactory.deleteCustomer(currentCustomer).success(function (data) {
            toastr.success("Deleted Successfully!!");
            $.each($scope.customers, function (i) {
                if ($scope.customers[i].customerID === currentCustomer.customerID) {
                    $scope.customers.splice(i, 1);
                    return false;
                }
            });
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occurred while Saving customer! " + data.ExceptionMessage;
            $scope.loading = false;

        });
    };

    //get all Customers- Self Calling -On load
    customerFactory.getCustomers().success(function (data) {
        $scope.customers = data;
        $scope.loading = false;
    })
    .error(function (data) {
        $scope.error = "An Error has occurred while loading posts! " + data.ExceptionMessage;
        $scope.loading = false;
    });

}]);