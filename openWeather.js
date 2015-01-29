(function () {
	"use strict";

	function OpenWeather() {
		var self = this;
		var worker = new OWworker(self);
		var URL = "http://api.openweathermap.org/data/2.5/weather?";
		var IMG_URL = "http://openweathermap.org/img/w/";
		self.worker = worker;
		self.URL = URL;
		self.IMG_URL = IMG_URL;
		self.data = {};
	};
	
	OpenWeather.prototype.getCurrentData = function () {
		var self = this;
		return self.data;
	};

	OpenWeather.prototype.getWeatherByLatLng = function (lat, lng, cbc) {
		var self = this;
		var url = self.URL + 'lat=' + lat + '&lon=' + lng;
		self.worker.getData(url, cbc);
	};

	OpenWeather.prototype.getWeatherByCurrentLocation = function (cbc) {
		var self = this;
		navigator.geolocation.getCurrentPosition(function (position) {
			var self = this.self;
			var cbc = this.cbc;
			var latlng = position.coords;
			var url = self.URL + 'lat=' + latlng.latitude + '&lon=' + latlng.longitude;
			self.worker.getData(url, cbc);
		}.bind({self: self, cbc: cbc}));
	};

	function OWworker(OW) {
		this.OW = OW;
	};

	OWworker.prototype.getData = function (url, cbc) {
		var self = this;
		var XHR = new XMLHttpRequest();
		XHR.open("GET", url, true);
		XHR.onreadystatechange = function () {
			var XHR = this.XHR;
			var self = this.self;
			var cbc = this.cbc;
			if (XHR.readyState == 4 && XHR.status == 200) {
				var data = JSON.parse(XHR.responseText);
				self.OW.data = data = self.processData(data);;
				cbc(data);
			}
		}.bind({
			XHR: XHR,
			self: self,
			cbc: cbc
		});
		XHR.send(null);
	};

	OWworker.prototype.processData = function (d) {
		var self = this;
		var weather = d.weather[0] || d.weather;
		var data = {
			main: weather.main,
			detail: weather.description,
			icon: self.getIconUrl(weather.icon),
			iconCode: weather.icon
		};
		return data;
	};
	OWworker.prototype.getIconUrl = function (iconCode) {
		var self = this;
		return self.OW.IMG_URL + iconCode + '.png';
	};

	window.OpenWeather = new OpenWeather();
}());