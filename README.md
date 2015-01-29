# OpenWeather
A simple library for getting weather of current location or a specified pair of latlng.

## Usage
```js
OpenWeather.getWeatherByLatLng(22, 122, function (data) {console.log(data)});
OpenWeather.getWeatherByCurrentLocation(function (data) {console.log(data)});
```

## Response
```js
{
	main: 'Rain',			// main category of weather condition
	detail: 'light rain',	// detail description of weather condition
	iconCode: '10d',		// weather code 
	icon: 'icon_url'		// icon url from Open Weather Map
}
// http://openweathermap.org/weather-conditions
```

## Reference
[Open Weather] (http://openweathermap.org/)