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

    var weatherCtrlFn = function weatherCtrlFn($scope, weatherService) {
        $scope.message = "Pizza Party";
        $scope.city = "Kansas City";

        $scope.cityNameTextBox = $scope.city;

        $scope.refreshWeather = function() {

            if(_.trim($scope.cityNameTextBox).length === 0) {
                showErrMsg($scope, "Please enter a city");
                return;
            } else {
                clearErrMsg($scope);
                $scope.city = $scope.cityNameTextBox;
            }

            weatherService.getWeather($scope.city)
                .then(function populateView(result) {
                    var data = result.data;
                    if(data.message) {
                        showErrMsg($scope, data.message);
                        return;
                    }

                    $scope.weather = data;
                },
                function() {
                    showErrMsg($scope, "OpenWeatherMap.org API call failed");
                });

            weatherService.getForecast($scope.city)
                .then(function(result) {
                    $scope.forecastItems = result.data.list;
                },
                function() {
                    showErrMsg($scope, "OpenWeatherMap.org API call failed");
                });
        };

        $scope.refreshWeather();

        $scope.getDate = function(time) {
            return new moment.unix(time);
        }
    };
    app.controller("WeatherCtrl", ["$scope", "WeatherService", weatherCtrlFn]);
}());