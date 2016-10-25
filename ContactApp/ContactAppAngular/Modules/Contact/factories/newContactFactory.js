﻿'use strict';

contactModule.factory('contactManager', function (requestManager) {

    var ajaxRequest = function (url, request, shouldPreviousRequestBeAborted) {
        return requestManager.ajaxRequest(url, request, shouldPreviousRequestBeAborted);
    };

    return {
        getContactList: function (request) {
            debugger;
            return ajaxRequest(window.apiUrls.contact.getList, request);
        },
        addContact: function (request) {
            debugger;
            return ajaxRequest(window.apiUrls.contact.persist, request);
        },
    };
});