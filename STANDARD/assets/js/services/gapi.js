'use strict';
app.factory('gapi', ['$timeout', function ($timeout) {

    var factory = {};
    var CLIENT_ID = '91499618649-eck6cp62rvfhu6hc7gujvain7mvmnjlq.apps.googleusercontent.com';
    var SCOPES = [
        'https://www.googleapis.com/auth/drive'
        // Add other scopes needed by your application.
    ];
    console.log('hei');

    factory.init = function() {
      $timeout(function() {
          checkAuth();
      }, 500);
    };

    function checkAuth() {
        gapi.auth.authorize(
            {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
            handleAuthResult);
    }

    function handleAuthResult(authResult) {
        if (authResult) {
            console.log(authResult);
            console.log('success');
            factory.listFiles();
            // Access token has been successfully retrieved, requests can be sent to the API
        } else {
            console.log('failure');
            // No access token could be retrieved, force the authorization flow.
            gapi.auth.authorize(
                {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
                handleAuthResult);
        }
    }

    factory.listFiles = function() {

        function makeApiCall() {
            gapi.client.load('drive', 'v2', makeRequest);
        }

        function makeRequest()
        {
            var request = gapi.client.request({
                'path': '/drive/v2/files',
                'method': 'GET',
                'params': {'maxResults': '5'}
            });

            request.execute(function(resp) {
                console.log(resp);
            });
        }

        makeApiCall();
    };

    return factory;

}]);