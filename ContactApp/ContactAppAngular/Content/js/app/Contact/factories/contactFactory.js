(function () {

//var app = angular.module('contact');

var apiUrl = 'api/Contacts';
contactModule.factory('contactFactory', function ($http) {
    return {
        getContacts: function () {
            return $http.get(apiUrl);
        },
        addContact: function (contact) {
            return $http.post(apiUrl, contact);
        },
        deleteContact: function (contact) {
            debugger;
            return $http.delete(apiUrl + "/" + contact.id);
        },
        updateContact: function (contact) {
            debugger;
            return $http.put(apiUrl + "/" + contact.id, contact);
        }
    };
});

})();