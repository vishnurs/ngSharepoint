angular.module('SPModule', [])

    .directive('ngSharepoint', ['SPService', function(SPService) {
        return {
            restrict: 'E',
            scope: {},
            template : '<div><div class="h-container"><div class="title">Lists</div><div class="numberCircle">{{listCount}}</div></div><div class="h-container" style="border-left:none"><div class="title">Docs</div><div class="numberCircle">{{libCount}}</div></div></div><style>.title { font-size:34px}.h-container {border: 1px solid #666;float: left;padding: 3px; }.numberCircle {margin-left:5px;width: 36px;height: 36px;padding: 8px;background: #fff;border: 2px solid #666;color: #666;text-align: center;font: 32px Arial, sans-serif;border-radius: 50%; behavior: url(PIE.htc);}</style>',
            link: function(scope, element, attrs) {
                SPService.getAllContents().then(function(response) {
                    var listCount = 0, libCount = 0;
                    angular.forEach(response.data.d.results, function(value, key) {
                        SPService.getContentType(value.ContentTypes.__deferred.uri).then(function(response) {
                            if(response.data.d.results[0].Name == 'Item') {
                                scope.listCount = ++listCount;
                            } else if(response.data.d.results[0].Name == 'Document') {
                                scope.libCount = ++libCount;
                            }
                        });
                    });
                });
            }
        };
    }])
    .service('SPService', function($http) {
    this.getAllContents = function () {
        return $http.get("https://izone.hbi.net/sites/Playground/vsubsite/_api/Web/Lists");
    };
    this.getContentType = function(url) {
        return $http.get(url);
    };

})
.config( ['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common.Accept = 'application/json;odata=verbose';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json;odata=verbose';
}]);
