'use strict';

contactModule.factory('requestManager', function ($http, $q, $timeout, notifier) {
    var deferredAbort = null;

    var cachedResponses = {};

    return {
        ajaxRequest: function (url, request, shouldPreviousRequestBeAborted, cacheKey) {
            if (shouldPreviousRequestBeAborted && deferredAbort) deferredAbort.resolve();

            var deferred = $q.defer();

            if (cacheKey && cachedResponses[cacheKey]) {
                $timeout(function () {
                    deferred.resolve(cachedResponses[cacheKey]);
                }, 0);

                return deferred.promise;
            }

            deferredAbort = deferred;
            $http.post(url, request, { timeout: deferred.promise })
                .success(function (response) {

                    if (cacheKey) {
                        cachedResponses[cacheKey] = response;
                    }

                    deferred.resolve(response);
                })
                .error(function (data, status) {
                    deferred.reject({ data: data, status: status, message: "Error while making HTTP request" });
                });

            return deferred.promise;
        },
        attemptToCallOperation: function (action) {
            var returnValue = $q.defer();
            action()
                .then(
                    function (response) {
                        notifier.showErrorIfResponseIsInvalid(response);
                        returnValue.resolve(response);
                    },
                    function () {
                        returnValue.reject("Failure to call the operation.");
                    });
            return returnValue.promise;
        },
        callOperation: function (attemptAction, successCallback, calledAction, errorCallback) {
            return attemptAction()
                .then(successCallback,
                    function (response) {
                        if (calledAction) {
                            if (!notifier.confirmUnsuccessfulLoad(response)) return;
                            calledAction();
                        }

                        if (errorCallback) {
                            errorCallback(response);
                        }
                    });
        }
    };
});