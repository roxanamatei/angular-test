var contactModule = angular.module('contact', ['contactStore', 'ui.bootstrap']);
contactModule.value("$", $);

//contactModule.config(["$routeProvider", function ($routeProvider) {

//    $routeProvider
        
//        .otherwise(
//            {
//                redirectTo: "/"
//            });
//}])