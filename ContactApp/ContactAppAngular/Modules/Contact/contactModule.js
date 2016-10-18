var contactModule = angular.module('contact', ['ui.bootstrap', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ngRoute']);
contactModule.value("$", $);

var mainTemplateUrl = "../Modules/Contact/templates/MainLayout.html";
var contactDetailsUrl = '../Modules/Contact/templates/ContactDetails.html';


contactModule.config(["$routeProvider", function ($routeProvider) {

$routeProvider.
 when('/', {
     controller: "ContactsController",
     templateUrl: mainTemplateUrl
 }).
 when('/details/:id', {
     controller: "ContactsController",
     templateUrl: contactDetailsUrl
 }).
 otherwise({
     redirectTo: '/'
 });

}])



