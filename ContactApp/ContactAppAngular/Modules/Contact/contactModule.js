var contactModule = angular.module('contact', ['ui.bootstrap', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ngRoute']);
contactModule.value("$", $);

var mainTemplateUrl = "../Modules/Contact/templates/MainLayout.html";

contactModule.config(["$routeProvider", function ($routeProvider) {

$routeProvider.
 when('/', {
     controller: "ContactsController",
     templateUrl: mainTemplateUrl
 }).
 // Notice that for the detail view, we specify a parameterized URL component
 // by placing a colon in front of the id
 when('/view/:id', {
     controller: "DetailController",
     templateUrl: 'detail.html'
 }).
 otherwise({
     redirectTo: '/'
 });

}])

