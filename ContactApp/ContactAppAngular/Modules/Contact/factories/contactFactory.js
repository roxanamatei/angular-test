(function () {

var apiUrl = 'api/Contacts';
contactModule.factory('contactFactory', function ($http) {
    return {
        getContacts: function () {
            return $http.get(apiUrl);
        },
        addContact: function (contact) {
            contact.birthay = new Date(contact.birthay);
            return $http.post(apiUrl, contact);
        },
        deleteContact: function (contact) {
            return $http.delete(apiUrl + "/" + contact.id);
        },
        updateContact: function (contact) {
            return $http.put(apiUrl + "/" + contact.id, contact);
        }
    };
});

})();