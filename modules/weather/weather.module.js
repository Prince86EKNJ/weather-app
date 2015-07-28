var app = (function(){
    'user strict';

    var config = function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "modules/weather/main.view.html"
            })
            .when("/forecast/:cityName", {
                templateUrl: "modules/weather/forecast.view.html"
            })
            .otherwise({ redirectTo: '/' });

            $httpProvider.interceptors.push("httpInterceptor");
    };

    var app = angular.module("weatherApp", ["ngRoute"])
        .config(["$routeProvider", "$httpProvider", config]);
    return app;
}());

