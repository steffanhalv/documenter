'use strict';
app.factory('gapi', ['$timeout', function ($timeout) {

    var factory = {};
    var CLIENT_ID = '91499618649-eck6cp62rvfhu6hc7gujvain7mvmnjlq.apps.googleusercontent.com';
    var SCOPES = [
        'https://www.googleapis.com/auth/drive'
    ];

    factory.authorize = function(auth) {

        $timeout(function() {
            gapi.auth.authorize({
              'client_id': CLIENT_ID,
              'scope': SCOPES,
              'immediate': true
            }, handleAuthResult);
        }, 500);

        var handleAuthResult = function(authResult) {
            if (authResult) {
                auth.done(authResult);
                // Access token has been successfully retrieved, requests can be sent to the API
            } else {
                // No access token could be retrieved, force the authorization flow.
                gapi.auth.authorize(
                    {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
                    handleAuthResult);
            }
        }

    };

    factory.listRoot = function(options) {

        var request = gapi.client.request({
            'path': '/drive/v2/files',
            'method': 'GET',
            'params': {
                'maxResults': '200',
                'q': "'root' in parents and trashed = false"
            }
        });

        request.execute(function(resp) {
            options.done(resp);
        });

    };

    return factory;

}]);