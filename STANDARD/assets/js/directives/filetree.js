'use strict';
/**
 * Returns the id of the selected e-mail.
 */
app.directive('filetree', ['$rootScope', '$compile','$timeout', 'gapi', function ($rootScope, $compile, $timeout, gapi) {
    return {
        template:   '<ul class="sub-menu">'+
                    '<li ng-repeat="item in items" mimetype="{{item.mimeType}}" id="{{item.id}}">'+
                    '<a href="#">'+
                    '<i class="ti-folder" ng-show="item.mimeType == \'application/vnd.google-apps.folder\'"></i>'+
                    '<i class="ti-file" ng-hide="item.mimeType == \'application/vnd.google-apps.folder\'"></i>'+
                    '<span>{{item.title}}</span>'+
                    '<i class="icon-arrow" ng-show="item.mimeType == \'application/vnd.google-apps.folder\'"></i>'+
                    '</a>'+
                    //'<filetree item="item.id"></filetree>'+
                    '</li>'+
                    '</ul>'
                    ,
        replace: true,
        link: function (scope, elem, attrs) {

            gapi.listFolder({
                id: attrs.item,
                done: function(resp) {
                    scope.items = resp.items;

                    $timeout(function() {
                        elem.find('li').each(function() {
                            if ($(this).attr('mimetype') == 'application/vnd.google-apps.folder') {
                                var content = $compile('<filetree item="'+$(this).attr('id')+'"></filetree>')($rootScope.$new());
                                $(this).append(content[0]);
                            }
                        });
                    }, 100);

                }
            });
        }
    };
}]);