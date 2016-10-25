'use strict';

contactModule.factory('notifier', function (toastr, $timeout) {

    return {
        showErrorIfResponseIsInvalid: function (response) {
            if (!response || !response.validationResults) return;

            response.validationResults.isValid = !response.validationResults.validationResultList || response.validationResults.validationResultList.length == 0;
            if (response.validationResults.isValid) return;

            $.each(response.validationResults.validationResultList, function (index, validationResult) {
                $timeout(function () {
                    toastr.error(validationResult.validationMessage, null, { timeOut: 0, extendedTimeout: 0, closeButton: true, closeHtml: '<button>x</button>' });
                }, index * 500);
            });
        },

        confirmUnsuccessfulLoad: function (message) {
            return confirm((message || 'Unable to retrieve information') + ' Please click OK to try again.');
        }
    };
});
