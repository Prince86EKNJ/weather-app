(function(){
    'use strict';

    var httpInterceptor  = function($q, $rootScope) {
        var numLoadings = 0;

        var responseHandler = function(response) {
            if((--numLoadings) === 0) {
                $rootScope.$broadcast("loader_hide");
            }
            return response || $q.when(response);
        };

        return {
            request: function(config) {
                numLoadings++;
                $rootScope.$broadcast("loader_show");
                return config || $q.when(config);
            },
            response: responseHandler,
            responseError: responseHandler
        };
    };

    app.factory("httpInterceptor", ["$q", "$rootScope", httpInterceptor]);
}());