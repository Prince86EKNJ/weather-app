var app = (function(){
    'user strict';

    var config = function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "modules/weather/main.view.html"
            })
            .when("/forecast/:cityName", {
                templateUrl: "modules/weather/forecast.view.html"
            })
            .otherwise({ redirectTo: '/' });

    };

    var app = angular.module("weatherApp", ["ngRoute"])
        .config(["$routeProvider", config]);
    return app;
}());
