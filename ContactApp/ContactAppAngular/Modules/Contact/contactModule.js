var contactModule = angular.module('contact', ['ui.bootstrap', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ngRoute']);
contactModule.value("$", $);

var mainTemplateUrl = "../Modules/Contact/templates/MainLayout.html";

//contactModule.value('routeUrls', routeUrls);

contactModule.config(["$routeProvider", function ($routeProvider) {

    //var templateUrls = {
    //    contacts: {
    //        editor: templatesFolder + 'Contact/ViewEditContact.html'
    //    }
    //};

    //var urlPaths = {
    //    add: '/mode/:modeType?',
    //    view_edit: '/id/:contactId?/mode/:modeType?',
    //    search: '/s/:searchText?/sort/:sortBy?/:sortAscending?/status/:selectedStatusFilter?'
    //};

    //var routes = {
    //    contacts: {
    //        editor: {
    //            templateUrl: templateUrls.contacts.editor,
    //            controller: 'ContactEditorController'
    //        }
    //    }
    //};

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
