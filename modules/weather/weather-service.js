app.factory("WeatherService", ['$http', function($http) {

    var baseUrl = "http://api.openweathermap.org/data/2.5/";

    var getWeather = function(city) {
        return $http.get(baseUrl + "weather?q=" + city + "&units=imperial");
    };
    var getForecast = function(city) {
        return $http.get(baseUrl + "forecast?q=" + city + "&units=imperial");
    };

    return {
        getWeather: getWeather,
        getForecast: getForecast
    };
}]);