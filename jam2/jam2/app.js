(function () {
    var app = angular.module('store', ['store-products']);

    //app.controller('StoreController', function () {
    //    this.products = gems;
    //});

    app.controller('StoreController', ['$http', '$log', function ($http, $log) {
        var store = this;
        store.products = [];
        $http.get('/productList.js').success(function (data) {
            store.products = data;
        });
        console.log(store.products);
    }]);

    app.controller('PanelController', function () {
        this.tab = 1;

        this.selectTab = function (setTab) {
            this.tab = setTab;
        };

        this.isSelected = function (checkTab) {
            return this.tab === checkTab;
        }
    });

    app.controller('ReviewController', function () {
        this.review = {};
        this.addReview = function (product) {
            product.reviews.push(this.review);
            this.review = {};
        };
    });

})();