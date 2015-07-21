(function(){
    'use strict';
    var clearErrMsg = function($scope) {
        $scope.errorMsg = null;
        $(".tempView").show();
    };

    var showErrMsg = function($scope, msg) {

        $(".tempView").hide();

        var errorStr = msg;
        $scope.errorMsg = errorStr;
        console.error(errorStr);
    };

    var weatherCtrlFn = function($routeParams, weatherService) {
        var ctrl = this;

        ctrl.message = "Pizza Party";
        ctrl.city = "Kansas City";

        ctrl.cityNameTextBox = ctrl.city;

        ctrl.refreshWeather = function() {

            if(_.trim(ctrl.cityNameTextBox).length === 0) {
                showErrMsg(ctrl, "Please enter a city");
                return;
            } else {
                clearErrMsg(ctrl);
                ctrl.city = ctrl.cityNameTextBox;
            }

            weatherService.getWeather(ctrl.city)
                .then(function populateView(result) {
                    var data = result.data;
                    if(data.message) {
                        showErrMsg(ctrl, data.message);
                        return;
                    }

                    ctrl.weather = data;
                },
                function() {
                    showErrMsg(ctrl, "OpenWeatherMap.org API call failed");
                });

            weatherService.getForecast(ctrl.city)
                .then(function(result) {
                    ctrl.forecastItems = result.data.list;
                },
                function() {
                    showErrMsg(ctrl, "OpenWeatherMap.org API call failed");
                });
        };

        ctrl.renderForecastPage = function() {
            var cityName = $routeParams.cityName;
            ctrl.city = cityName;
            weatherService.getForecast(cityName)
                .then(function(result) {
                    ctrl.forecastItems = result.data.list;
                },
                function() {
                    showErrMsg(ctrl, "OpenWeatherMap.org API call failed");
                });
        }

        ctrl.refreshWeather();

        ctrl.getDate = function(time) {
            return new moment.unix(time);
        }

        return ctrl;
    };
    app.controller("WeatherCtrl", ["$routeParams", "WeatherService", weatherCtrlFn]);
}());