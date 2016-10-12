var contactModule = angular.module('contact', ['ui.bootstrap', 'ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav']);
contactModule.value("$", $);

//contactModule.config(["$routeProvider", function ($routeProvider) {

//    $routeProvider
        
//        .otherwise(
//            {
//                redirectTo: "/"
//            });
//}])