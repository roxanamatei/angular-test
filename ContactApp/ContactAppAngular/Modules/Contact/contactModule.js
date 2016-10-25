﻿var contactModule = angular.module('contact', ['ui.bootstrap', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ngRoute', 'ui.grid.infiniteScroll']);
contactModule.value("$", $);
contactModule.value('toastr', toastr);

contactModule.value('modeTypes', { view: 'view', edit: 'edit', add: 'add' });

var mainTemplateUrl = "../Modules/Contact/templates/MainLayout.html";
var contactDetailsUrl = '../Modules/Contact/templates/ContactDetails.html';


contactModule.config(["$routeProvider", function ($routeProvider) {

$routeProvider.
 when('/', {
     controller: "ContactsController",
     templateUrl: mainTemplateUrl
 }).
 when('/details/:id?/mode/:modeType?', {
     controller: "ContactDetailsController",
     templateUrl: contactDetailsUrl
 }).
 when('/s/:searchText?/sort/:sortBy?/:sortAscending?', {
     controller: "ContactsController",
        templateUrl: mainTemplateUrl
    }).
 otherwise({
     redirectTo: '/'
 });

}])
