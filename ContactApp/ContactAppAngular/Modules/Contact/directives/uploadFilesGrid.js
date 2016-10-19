'use strict';

contactModule.directive('uploadFilesGrid', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: '../Modules/Contact/templates/UploadFilesGrid.html',
        scope: { url: '=', queryOptions: '=', continueUploadCallback: '&', onCompleteCallback: '&' },
        link: function (scope) {
            scope.isDropFilesSupported = true;

            var responses;
            var isSuccessMessageShown;

            scope.startUpload = function (flow) {
                debugger;
                responses = [];
                isSuccessMessageShown = false;

                if (scope.continueUploadCallback && scope.continueUploadCallback() === false) return;

                flow.opts.query = scope.queryOptions;
                flow.upload();
            };

            scope.flowFileSuccess = function (response) {
                response = JSON.parse(response);
                responses.push(response);
            };

            scope.flowComplete = function () {
                var validResponse = _.findWhere(responses, { isValid: true });
                var inValidResponse = _.findWhere(responses, { isValid: false });

                if (!validResponse && !inValidResponse) return;

                var message = inValidResponse ? inValidResponse.message : validResponse.message;

                if (validResponse && isSuccessMessageShown) return; // show success message only once

                if (!scope.onCompleteCallback) return;

                scope.onCompleteCallback({ message: message, isValid: !!validResponse });

                if (validResponse && !isSuccessMessageShown) {
                    isSuccessMessageShown = true;
                }
            };

            scope.flowFileAdded = function (file) {
                if (file.size === 0) {
                    alert(file.name + ' is empty. You cannot upload an empty file.');
                    return false;
                }

                if (!file.size) return true; // for old browsers

                var maxFileSize = 524288000; // max accepted file size
                if (file.size <= maxFileSize) return true;

                alert('The file you are adding exceeds the 500MB limit: ' + file.name);
                return false;
            };

            scope.flowError = function (file, response, files) {
                response = JSON.parse(response);
                if (!response || !response.message) return;

                alert(response.message);

                deleteFile(file, files);
            };

            // flow-files-submitted="$flow.upload()"

            var deleteFile = function (file, files) {
                var index = files.indexOf(file);
                if (index > -1) {
                    files.splice(index, 1);
                }
            };

            scope.$on('deleteFile', function (event, file, files) {
                deleteFile(file, files);
            });
        }
    };
});