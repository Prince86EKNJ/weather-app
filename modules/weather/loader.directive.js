(function(){
    'use strict';

    var loaderDirective = function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            template: "<div ng-transclude></div>",
            link: function(scope, element, attrs) {
                scope.$on("loader_show", function() {
                   element.css("display", "block");
                });
                scope.$on("loader_hide", function() {
                   element.css("display", "none");
                });
            }
        }
    };

    app.directive("loader", loaderDirective);
}());