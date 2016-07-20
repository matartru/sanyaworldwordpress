(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var
	/**
	 * GeoObject - parent class
	 */
	GeoObject = require('./geoobject.class'),
	/**
	 * Inheritance module
	 */
	inherits = require('util').inherits,
	/**
	 * Place
	 */
	Place = require('./place.class'),
	/**
	 * Company
	 */
	Company = require('./company.class'),
	/**
	 * News
	 */
	News = require('./news.class'),
	/**
	 * Excursion
	 */
	Excursion = require('./excursion.class');

/**
 * City entity
 * @param {object} options City options
 */
function City (options) {

	/**
	 * Call parent constructor
	 */
	City.super_.call(this, 'City', options);
	/**
	 * City places will be stored in array
	 */
	this.places = [];
	/**
	 * City companies will be stored in array
	 */
	this.companies = [];
	/**
	 * City news will be stored in array
	 */
	this.news = [];
	/**
	 * City excursions will be stored in array
	 */
	this.excursions = [];

};

/**
 * Inherit City from GeoObject
 */
inherits(City, GeoObject);

/**
 * Map zoom
 */
City.prototype.getZoom = function () {

	return 15;

};

/**
 * Get places
 */
City.prototype.getPlaces = function (criteriaName) {

	switch (criteriaName) {
	default:
		/*
		 */
		return this.places;
	};

};

/**
 * Get events
 */
City.prototype.getEvents = function () {

	var result = [];

	this.getPlaces().map(function (place) {

		place.getEvents().map(function (event) {

			result.push(event);

		});

	});

	return result;

};

/**
 * Get companies
 */
City.prototype.getCompanies = function (criteriaName) {

	switch (criteriaName) {
	default:
		/*
		 */
		return this.companies;
	};

};

/**
 * Get vacancies
 */
City.prototype.getVacancies = function (criteriaName) {

	var result = [];

	this.getCompanies().map(function (company) {

		company.getVacancies().map(function (vacancy) {

			result.push(vacancy);

		});

	});

	return result;

};

/**
 * Get news
 */
City.prototype.getNews = function (criteriaName) {

	switch (criteriaName) {
	default:
		/*
		 */
		return this.news;
	};

};

/**
 * Get excursions
 */
City.prototype.getExcursions = function (criteriaName) {

	switch (criteriaName) {
	default:
		/*
		 */
		return this.excursions;
	};

};

/**
 * Get places count
 */
City.prototype.data_placesCount = function () {

	return this.getPlaces().length;

};

/**
 * Get companies count
 */
City.prototype.data_companiesCount = function () {

	return this.getCompanies().length;

};

/**
 * Get vacancies count
 */
City.prototype.data_vacanciesCount = function () {

	return this.getVacancies().length;

};

/**
 * Get news count
 */
City.prototype.data_newsCount = function () {

	return this.getNews().length;

};

/**
 * GEt excursions count
 */
City.prototype.data_excursionsCount = function () {

	return this.getExcursions().length;

};

/**
 * Add place (create new or use existing)
 * @param {object} options Place options
 */
City.prototype.addPlace = function (options) {

	var result;
	if ('Place' === options.className)
		result = options;
	else
		result = new Place(options);
	var pos = this.places.indexOf(result);
	if (-1 === pos)
		this.places.push(result);
	else
		this.places[pos] = result;
	result.city = this;
	return result;

};

/**
 * Add company (create new or use existing)
 * @param {object} options Company options
 */
City.prototype.addCompany = function (options) {

	var result;
	if ('Company' === options.className)
		result = options;
	else
		result = new Company(options);
	var pos = this.companies.indexOf(result);
	if (-1 === pos)
		this.companies.push(result);
	else
		this.companies[pos] = result;
	result.city = this;
	return result;

};

/**
 * Add news (create new or use existing)
 * @param {object} options News options
 */
City.prototype.addNews = function (options) {

	var result;
	if ('News' === options.className)
		result = options;
	else
		result = new News(options);
	var pos = this.news.indexOf(result);
	if (-1 === pos)
		this.news.push(result);
	else
		this.news[pos] = result;
	result.city = this;
	return result;

};

/**
 * Add excursion (create new or use existing)
 * @param {object} options Excursion options
 */
City.prototype.addExcursion = function (options) {

	var result;
	if ('Excursion' === options.className)
		result = options;
	else
		result = new Excursion(options);
	var pos = this.excursions.indexOf(result);
	if (-1 === pos)
		this.excursions.push(result);
	else
		this.excursions[pos] = result;
	result.city = this;
	return result;

};

/**
 * Create Map.Marker
 * @param {Map} map Map-owner for new marker
 * @param {object} options Marker options
 */
City.prototype.createMarker = function (map, options) {

	var defaults = {
		latitude: this.data('latitude'),
		longitude: this.data('longitude'),
		icon: 'img/pins/marker.png',
		infoWindow: {
			contentString: '<div class="left citypin">' +
			'<h3>' + this.data('name') + '</h3>' +
			'</div>',
			pixelOffset: new google.maps.Size(20, 30)
		}
	};
	options = $.extend(defaults, options);

	this.marker = map.addMarker(options);

	return this.marker;

};

module.exports = City;

},{"./company.class":2,"./excursion.class":5,"./geoobject.class":6,"./news.class":7,"./place.class":8,"util":18}],2:[function(require,module,exports){
'use strict';

var
	/**
	 * GeoObject - parent class
	 */
	GeoObject = require('./geoobject.class'),
	/**
	 * Inheritance module
	 */
	inherits = require('util').inherits,
	/**
	 * Vacancy
	 */
	Vacancy = require('./vacancy.class');

/**
 * Company entity
 * @param {object} options Company options
 */
function Company (options) {

	/**
	 * Call parent constructor
	 */
	Company.super_.call(this, 'Company', options);

	this.vacancies = [];

	this.data('type', options.type);
	this.data('description', options.description);
	this.data('tags', options.tags);
	this.data('address', options.address);

};

/**
 * Inherit Company from GeoObject
 */
inherits(Company, GeoObject);

/**
 * Map zoom
 */
Company.prototype.getZoom = function () {

	return 19;

};

/**
 * Get vacancies
 */
Company.prototype.getVacancies = function (criteriaName) {

	switch (criteriaName) {
	default:
		/*
		 */
		return this.vacancies;
	};

};

/**
 * Get vacancies count
 */
Company.prototype.data_VacanciesCount = function () {

	return this.getVacancies().length;

};

/**
 * Add vacancy (create new or use existing)
 * @param {object} options Vacancy options
 */
Company.prototype.addVacancy = function (options) {

	var result;
	if ('Vacancy' === options.className)
		result = options;
	else
		result = new Vacancy(options);
	var pos = this.vacancies.indexOf(result);
	if (-1 === pos)
		this.vacancies.push(result);
	else
		this.vacancies[pos] = result;
	result.company = this;
	return result;

};

module.exports = Company;
},{"./geoobject.class":6,"./vacancy.class":9,"util":18}],3:[function(require,module,exports){
'use strict';

var
	/**
	 * GeoObject - parent class
	 */
	GeoObject = require('./geoobject.class'),
	/**
	 * Inheritance module
	 */
	inherits = require('util').inherits,
	/**
	 * City
	 */
	City = require('./city.class');

/**
 * Country entity
 * @param {object} options Country options
 */
function Country (options) {

	/**
	 * Call parent constructor
	 */
	Country.super_.call(this, 'Country', options);
	/**
	 * Country cities will be stored in array
	 */
	this.cities = [];

};

/**
 * Inherit Country from GeoObject
 */
inherits(Country, GeoObject);

/**
 * Add city (create new or use existing)
 * @param {object} options City options
 */
Country.prototype.addCity = function (options) {

	var result;
	if ('City' === options.className)
		result = options;
	else
		result = new City(options);
	var pos = this.cities.indexOf(result);
	if (-1 === pos)
		this.cities.push(result);
	else
		this.cities[pos] = result;
	result.country = this;
	return result;

};

/**
 * Get cities
 */
Country.prototype.getCities = function (criteriaName) {

	switch (criteriaName) {
	default:
		/*
		 */
		return this.cities;
	};

};

/**
 * Cities count
 */
Country.prototype.data_citiesCount = function () {

	return this.getCities() .length;

};

/**
 * Create Map.Marker
 * @param {Map} map Map-owner for new marker
 * @param {object} options Marker options
 */
Country.prototype.createMarker = function (map, options) {

	var defaults = {
		latitude: this.data('latitude'),
		longitude: this.data('longitude'),
		icon: 'img/pins/' + this.data('code') + '.png',
		infoWindow: {
			contentString: '<div class="right counpin">' +
			'<img src="img/country/' + this.data('code') + '.png" />' +
			'<h3>' + this.data('name') + '</h3>' +
			'<span class="rating">' + this.data('rating') + '</span>' +
			'</div>',
			pixelOffset: new google.maps.Size(40, 60)
		}
	};
	options = $.extend(defaults, options);

	this.marker = map.addMarker(options);

	return this.marker;

};

module.exports = Country;

},{"./city.class":1,"./geoobject.class":6,"util":18}],4:[function(require,module,exports){
'use strict';

var
	/**
	 * GeoObject - parent class
	 */
	GeoObject = require('./geoobject.class'),
	/**
	 * Inheritance module
	 */
	inherits = require('util').inherits;

/**
 * Event entity
 * @param {object} options Event options
 */
function Event (options) {

	/**
	 * Call parent constructor
	 */
	Event.super_.call(this, 'Event', options);

	this.data('description', options.description);
	this.data('datetime', options.datetime);
	this.data('currency', options.currency);
	this.data('price', options.price);
	this.data('tags', options.tags);

};

/**
 * Inherit Event from GeoObject
 */
inherits(Event, GeoObject);

/**
 * Map zoom
 */
Event.prototype.getZoom = function () {

	return 19;

};

/**
 * Get and set data
 * @param  {string} paramName  Parameter Name
 * @param  {any} paramValue Parameter Value (must be empty if you want to get value)
 */
Event.prototype.data = function (paramName, paramValue) {

	if ('latitude' === paramName && 'undefined' === typeof paramValue)
		return this.place.data(paramName);
	if ('longitude' === paramName && 'undefined' === typeof paramValue)
		return this.place.data(paramName);

	return Event.super_.prototype.data.apply(this, arguments);

};

/**
 * Create Map.Marker
 * @param {Map} map Map-owner for new marker
 * @param {object} options Marker options
 */
Event.prototype.createMarker = function (map, options) {

	var defaults = {
		latitude: this.data('latitude'),
		longitude: this.data('longitude'),
		icon: 'img/pins/' + this.place.data('type') + '.png',
		infoWindow: {
			contentString: '<div class="left citypin">' +
			'<h3>' + this.data('name') + '</h3>' +
			'</div>',
			pixelOffset: new google.maps.Size(30, 50)
		}
	};
	options = $.extend(defaults, options);

	this.marker = map.addMarker(options);

	return this.marker;

};

module.exports = Event;

},{"./geoobject.class":6,"util":18}],5:[function(require,module,exports){
'use strict';

var
	/**
	 * GeoObject - parent class
	 */
	GeoObject = require('./geoobject.class'),
	/**
	 * Inheritance module
	 */
	inherits = require('util').inherits,
	/**
	 * Marker
	 */
	Marker = require('./../map/marker.class');

/**
 * Excursion entity
 * @param {object} options Excursion options
 */
function Excursion (options) {

	/**
	 * Call parent constructor
	 */
	Excursion.super_.call(this, 'Excursion', options);

	this.data('title', options.name);
	this.data('description', options.description);
	this.data('currency', options.currency);
	this.data('price', options.price);
	this.data('language', options.language);
	this.data('duration', options.duration);
	this.data('guide', options.guide);
	this.data('latitudeOrigin', options.latitudeOrigin);
	this.data('longitudeOrigin', options.longitudeOrigin)
	this.data('latitudeDestination', options.latitudeDestination);
	this.data('longitudeDestination', options.longitudeDestination);

};

/**
 * Inherit Excursion from GeoObject
 */
inherits(Excursion, GeoObject);

/**
 * Map zoom
 */
Excursion.prototype.getZoom = function () {

	return 19;

};

/**
 * Create excursion route
 * @param  {Map} map     Map
 * @param  {object} options Route options
 * @return {Map.Route}
 */
Excursion.prototype.createRoute = function (map, options) {

	this.markers = {};
	/**
	 * Route origin marker
	 */
	var originOptions = {
		latitude: this.data('latitudeOrigin'),
		longitude: this.data('longitudeOrigin'),
		icon: 'img/pins/route.png'
	};
	if ('undefined' !== typeof options)
		originOptions = $.extend(originOptions, options.markers);
	this.markers.origin = map.addMarker(originOptions);

	/**
	 * Route destination marker
	 */
	var destinationOptions = {
		latitude: this.data('latitudeDestination'),
		longitude: this.data('longitudeDestination'),
		icon: 'img/pins/route.png'
	};
	if ('undefined' !== typeof options)
		destinationOptions = $.extend(destinationOptions, options.markers);
	this.markers.destination = map.addMarker(destinationOptions);

	/**
	 * Default route options
	 */
	var defaults = {
	};
	options = $.extend(defaults, options);

	/**
	 * Create excursion route
	 */
	this.route = map.addRoute(this.markers.origin, this.markers.destination, options);
	this.route.show();

	return this.route;

};

module.exports = Excursion;
},{"./../map/marker.class":12,"./geoobject.class":6,"util":18}],6:[function(require,module,exports){
'use strict';

/**
 * GeoObject
 * @param {string} className Object class name
 * @param {object} options   GeoObject options
 */
function GeoObject (className, options) {

	// console.group('GeoObject constructor');
	// console.info(className);
	// console.info(options);
	// console.groupEnd();

	/**
	 * Object unique id
	 */
	this.id = options.id;
	/**
	 * Object name
	 */
	this.name = options.name;
	/**
	 * Object optional data
	 */
	this._data = {};
	/**
	 * Class name
	 */
	this.className = className;
	/**
	 * Linked marker
	 */
	this.marker = false;

	/**
	 * Save object optional data separately
	 */
	if ('undefined' !== typeof options.code)
		this.data('code', options.code);
	if ('undefined' !== typeof options.name)
		this.data('name', options.name);
	if ('undefined' !== typeof options.latitude)
		this.data('latitude', options.latitude);
	if ('undefined' !== typeof options.longitude)
		this.data('longitude', options.longitude);

	/**
	 * Create random data for demo
	 */
	this.data('rating', (5 * Math.random()).toFixed(2));
	this.data('comments', Math.floor(1000 * Math.random()));

};

/**
 * Get and set data
 * @param  {string} paramName  Parameter Name
 * @param  {any} paramValue Parameter Value (must be empty if you want to get value)
 */
GeoObject.prototype.data = function (paramName, paramValue) {

	/**
	 * Possible to use getter for execute functions
	 */
	if ('function' === typeof this['data_' + paramName])
		return this['data_' + paramName]();

	if ('undefined' === typeof paramValue) {
		/**
		 * Get data
		 */
		if ('undefined' === typeof this._data[paramName]) {
			console.group('Empty paramValue');
			console.log(this.className);
			console.log(this);
			console.log(paramName);
			console.groupEnd();
		};
		return this._data[paramName];
	} else {
		/**
		 * Set data
		 */
		this._data[paramName] = paramValue;
		return this._data[paramName];
	};

};

/**
 * Each GeoObject can create infoWindow
 */
GeoObject.prototype.getInfoWindowOptions = function () {

	return {
		contentString: this.data('name')
	}

};

/**
 * Each GeoObject can create Map.Marker
 * @param  {Map} map     Map
 * @param  {object} options Marker options
 */
GeoObject.prototype.createMarker = function (map, options) {

	/**
	 * Only for objects which contains geo data
	 */
	if (!(this.data('latitude') && this.data('longitude')))
		return;

	var defaults = {
		latitude: this.data('latitude'),
		longitude: this.data('longitude'),
		label: this.data('name')
	};
	options = $.extend(defaults, options);

	if (true !== options.suppressInfoWindow)
		options.infoWindow = this.getInfoWindowOptions();

	this.marker = map.addMarker(options);

	return this.marker;

};

/**
 * Each GeoObject contain unique zoom
 */
GeoObject.prototype.getZoom = function () {

	return 3;

};

/**
 * Each GeoObject can create map
 * @param  {string} selector Map container
 * @param  {object} options  Map options
 * @return {Map}
 */
GeoObject.prototype.createMap = function (selector, options) {

	/**
	 * Default map options
	 */
	var defaults = {
		latitude: this.data('latitude'),
		longitude: this.data('longitude'),
		zoom: this.getZoom()
	};
	options = $.extend(defaults, options);

	return new MyWorld.Map(selector, options);

};

/**
 * Output data in jQuery section
 * @param  {string} selector jQuery selector
 */
GeoObject.prototype.output = function (selector) {

	var
		$element,
		that = this;

	$(selector).find('[data-value]').each(function (index, element) {

		$element = $(element);
		$element.html(that.data($element.data('value')));

	});

};

module.exports = GeoObject;
},{}],7:[function(require,module,exports){
'use strict';

var
	/**
	 * GeoObject - parent class
	 */
	GeoObject = require('./geoobject.class'),
	/**
	 * Inheritance module
	 */
	inherits = require('util').inherits;

/**
 * News entity
 * @param {object} options News options
 */
var News = function (options) {

	/**
	 * Call parent constructor
	 */
	News.super_.call(this, 'News', options);

	this.data('title', options.name);
	this.data('datetime', options.datetime);
	this.data('description', options.description);
	this.data('tags', options.tags);

};

/**
 * Inherit News from GeoObject
 */
inherits(News, GeoObject);

/**
 * Map zoom
 */
News.prototype.getZoom = function () {

	return 19;

};

/**
 * Get and set data
 * @param  {string} paramName  Parameter Name
 * @param  {any} paramValue Parameter Value (must be empty if you want to get value)
 */
News.prototype.data = function (paramName, paramValue) {

	if ('latitude' === paramName && 'undefined' === typeof paramValue)
		return ('undefined' === this._data['latitude']) ? false : this._data['latitude'];
	if ('longitude' === paramName && 'undefined' === typeof paramValue)
		return ('undefined' === this._data['longitude']) ? false : this._data['longitude'];

	return News.super_.prototype.data.apply(this, arguments);

};

/**
 * Create Map.Marker
 * @param {Map} map Map-owner for new marker
 * @param {object} options Marker options
 */
News.prototype.createMarker = function (map, options) {

	if (!(this.data('latitude') && this.data('longitude'))) {
		this.marker = false;
		return this.marker;
	};

	var defaults = {
		latitude: this.data('latitude'),
		longitude: this.data('longitude'),
		icon: 'img/pins/route.png',
		infoWindow: {
			contentString: '<div class="left citypin">' +
			'<h3>' + this.data('title') + '</h3>' +
			'</div>',
			pixelOffset: new google.maps.Size(30, 50)
		}
	};
	options = $.extend(defaults, options);

	this.marker = map.addMarker(options);

	return this.marker;

};

module.exports = News;

},{"./geoobject.class":6,"util":18}],8:[function(require,module,exports){
'use strict';

var
	/**
	 * GeoObject - parent class
	 */
	GeoObject = require('./geoobject.class'),
	/**
	 * Inheritance module
	 */
	inherits = require('util').inherits,
	/**
	 * Event
	 */
	Event = require('./event.class');

/**
 * Place entity
 * @param {object} options Place options
 */
function Place (options) {

	/**
	 * Call parent constructor
	 */
	Place.super_.call(this, 'Place', options);
	/**
	 * Place events will be stored in array
	 */
	this.events = [];

	this.data('type', options.type);
	this.data('description', options.description);
	this.data('tags', options.tags);
	this.data('address', options.address);

};

/**
 * Inherit Place from GeoObject
 */
inherits(Place, GeoObject);

/**
 * Map zoom
 */
Place.prototype.getZoom = function () {

	return 19;

};

/**
 * Get events
 */
Place.prototype.getEvents = function (criteriaName) {

	switch (criteriaName) {
	default:
		/*
		 */
		return this.events;
	};

};

/**
 * Get events count
 */
Place.prototype.data_EventsCount = function () {

	return this.getEvents().length;

};

/**
 * Add event (create new or use existing)
 * @param {object} options Event options
 */
Place.prototype.addEvent = function (options) {

	var result;
	if ('Event' === options.className)
		result = options;
	else
		result = new Event(options);
	var pos = this.events.indexOf(result);
	if (-1 === pos)
		this.events.push(result);
	else
		this.events[pos] = result;
	result.place = this;
	return result;

};

/**
 * Create Map.Marker
 * @param {Map} map Map-owner for new marker
 * @param {object} options Marker options
 */
Place.prototype.createMarker = function (map, options) {

	console.log(options);

	var defaults = {
		latitude: this.data('latitude'),
		longitude: this.data('longitude'),
		icon: 'img/pins/' + this.data('type') + '.png',
		infoWindow: {
			contentString: '<div class="left citypin">' +
			'<h3>' + this.data('name') + '</h3>' +
			'</div>',
			pixelOffset: new google.maps.Size(30, 50)
		}
	};
	options = $.extend(defaults, options);

	this.marker = map.addMarker(options);

	return this.marker;

};

module.exports = Place;

},{"./event.class":4,"./geoobject.class":6,"util":18}],9:[function(require,module,exports){
'use strict';

var
	/**
	 * GeoObject - parent class
	 */
	GeoObject = require('./geoobject.class'),
	/**
	 * Inheritance module
	 */
	inherits = require('util').inherits;

/**
 * Vacancy entity
 * @param {object} options Vacancy options
 */
function Vacancy (options) {

	/**
	 * Call parent constructor
	 */
	Vacancy.super_.call(this, 'Vacancy', options);

	this.data('salary', options.salary);
	this.data('currency', options.currency);
	this.data('description', options.description);
	this.data('tags', options.tags);

};

/**
 * Inherit Vacancy from GeoObject
 */
inherits(Vacancy, GeoObject);

/**
 * Map zoom
 */
Vacancy.prototype.getZoom = function () {

	return 19;

};

/**
 * Get and set data
 * @param  {string} paramName  Parameter Name
 * @param  {any} paramValue Parameter Value (must be empty if you want to get value)
 */
Vacancy.prototype.data = function (paramName, paramValue) {

	if ('latitude' === paramName && 'undefined' === typeof paramValue)
		return this.company.data(paramName);
	if ('longitude' === paramName && 'undefined' === typeof paramValue)
		return this.company.data(paramName);

	return Vacancy.super_.prototype.data.apply(this, arguments);

};

/**
 * Create Map.Marker
 * @param {Map} map Map-owner for new marker
 * @param {object} options Marker options
 */
Vacancy.prototype.createMarker = function (map, options) {

	var defaults = {
		latitude: this.data('latitude'),
		longitude: this.data('longitude'),
		icon: 'img/pins/' + this.company.data('type') + '.png',
		infoWindow: {
			contentString: '<div class="left citypin">' +
			'<h3>' + this.data('name') + '</h3>' +
			'</div>',
			pixelOffset: new google.maps.Size(30, 50)
		}
	};
	options = $.extend(defaults, options);

	this.marker = map.addMarker(options);

	return this.marker;

};

module.exports = Vacancy;

},{"./geoobject.class":6,"util":18}],10:[function(require,module,exports){
'use strict';

/**
 * Map.InfoWindow
 * @param {Map.Marker} marker  Map marker-owner
 * @param {object} options InfoWindow options
 */
function InfoWindow (marker, options) {

	this.extend(google.maps.OverlayView, InfoWindow);

	/**
	 * Default options for Map.InfoWindow
	 */
	var defaults = {
	};
	this.options = $.extend(defaults, options);

	this.marker = marker;

	this.position = {
		left: 0,
		top: 0
	};

	this.build();
	this.setValues(this.options);

};

/**
 * Extends object prototype by anothers
 * @param  {object} source Source object (to extend with)
 * @param  {object} destination Destination object (to be extended)
 * @return {object}      	New extended object
 */
InfoWindow.prototype.extend = function(source, destination) {

	return (function (object) {

		for (var property in object.prototype)
			this.prototype[property] = object.prototype[property];
		return this;

	}).apply(destination, [source]);

};

/**
 * Builds the InfoWindow dom
 */
InfoWindow.prototype.build = function () {

	/**
	 * Create main window
	 */
	this.window = document.createElement('div');
	this.window.className = 'markinfo dark';
	this.window.style['display'] = 'none';

};

/**
 * Add "px" to value
 * @param  {number} num The number to wrap
 * @return {string|number}     Wrapper number
 */
InfoWindow.prototype.px = function (value) {

	return (value ? value + 'px' : value);

};

/**
 * Add events to stop propagation
 * @private
 */
InfoWindow.prototype.addEvents = function() {

	var
		me = this,
		/**
		 * We want to cancel all the events so they do not go to the map
		 */
		events = ['mousedown', 'mousemove', 'mouseover', 'mouseout', 'mouseup',
			'mousewheel', 'DOMMouseScroll', 'touchstart', 'touchend', 'touchmove',
			'dblclick', 'contextmenu', 'click'];

	this.listeners = [];
	for (var i = 0, event; event = events[i]; i++) {

		this.listeners.push(

			google.maps.event.addDomListener(me.window, event, function(e) {
				e.cancelBubble = true;
				if (e.stopPropagation)
					e.stopPropagation();
			})

		);

	};

};

/**
 * On Adding the InfoWindow to a map
 * Implementing the OverlayView interface
 */
InfoWindow.prototype.onAdd = function() {

	if (!this.window)
		this.build();

	this.addEvents();

	var panes = this.getPanes();
	if (panes)
		panes.floatPane.appendChild(this.window);

	/**
	 * Once the InfoWindow has been added to the DOM, fire 'domready' event
	 */
	google.maps.event.trigger(this, 'domready');

};

/**
 * Removing the InfoWindow from a map
 */
InfoWindow.prototype.onRemove = function () {

	if (this.window && this.window.parentNode)
		this.window.parentNode.removeChild(this.window);

	for (var i = 0, listener; listener = this.listeners[i]; i++)
		google.maps.event.removeListener(listener);

};

/**
 * Converts a HTML string to a document fragment.
 * @param  {string} htmlString The HTML string to convert
 * @return {Node}            HTML fragment
 */
InfoWindow.prototype.htmlToDocumentFragment = function (htmlString) {

	htmlString = htmlString.replace(/^\s*([\S\s]*)\b\s*$/, '$1');
	var tempDiv = document.createElement('div');
	tempDiv.innerHTML = htmlString;
	if (tempDiv.childNodes.length == 1) {
		return tempDiv.removeChild(tempDiv.firstChild);
	} else {
		var fragment = document.createDocumentFragment();
		while (tempDiv.firstChild)
			fragment.appendChild(tempDiv.firstChild);
		return fragment;
	};

};

/**
 * Draw the InfoWindow (Implementing the OverlayView interface)
 */
InfoWindow.prototype.draw = function () {

	var projection = this.getProjection();

	if (!projection)
		/**
		 * The map projection is not ready yet so do nothing
		 */
		return;

	var pos = projection.fromLatLngToDivPixel(this.marker.instance.position);
	this.position = {
		left: pos.x,
		top: pos.y
	};

	if (this.options.pixelOffset) {
		this.position.left += this.options.pixelOffset.width;
		this.position.top -= this.options.pixelOffset.height;
	};

	this.removeChildren(this.window);

	var contentString = this.options.contentString;
	if (contentString)
		this.window.appendChild(('string' === typeof contentString) ? this.htmlToDocumentFragment(contentString) : contentString);

	this.window.style['left'] = this.px(this.position.left);
	this.window.style['top'] = this.px(this.position.top);

};

/**
 * Remove all children from the node
 * @param  {node} node The node to remove all children from
 */
InfoWindow.prototype.removeChildren = function(node) {

	if (!node)
		return;

	var child;
	while (child = node.firstChild)
		node.removeChild(child);

};

/**
 * Show InfoWindow
 */
InfoWindow.prototype.show = function () {

	/**
	 * Hide active infoWindow (if it exists)
	 */
	this.marker.map.hideInfoWindow();

	/**
	 *
	 */
	this.draw();

	/**
	 * Setting map
	 */
	this.setMap(this.marker.map.instance);
	/**
	 * Setting anchor (marker)
	 */
	this.set('anchor', this.marker.instance);
	this.bindTo('anchorPoint', this.marker.instance);
	this.bindTo('position', this.marker.instance);

	/**
	 * Show the window
	 */
	this.window.style['display'] = '';

	/**
	 * Save current infoWindow as Map activeInfoWindow
	 */
	this.marker.map.activeInfoWindow = this;

};

/**
 * Hide InfoWindow
 */
InfoWindow.prototype.hide = function () {

	if (this.window)
		this.window.style['display'] = 'none';

};

module.exports = InfoWindow;

},{}],11:[function(require,module,exports){
'use strict';

/**
 * Map
 * @param {string} selector Map container
 * @param {object} options  Map options
 */
function Map (selector, options) {

	/**
	 * Map markers will be stored in array
	 */
	this.markers = [];
	/**
	 * Map routes will be stored in array
	 */
	this.routes = [];
	/**
	 * Current (opened) info window
	 */
	this.activeInfoWindow = false;

	/**
	 * Default options for map
	 */
	var defaults = {
		center: {
			lat: options.latitude,
			lng: options.longitude
		},
		/**
		 * Map zoom
		 */
		zoom: 3,
		/**
		 * We disabling standard Google UI
		 */
		disableDefaultUI: true
	};
	this.options = $.extend(defaults, options);

	/**
	 * We don't need store these options
	 */
	delete this.options.latitude;
	delete this.options.longitude;

	/**
	 * Standard google.maps.Map will be stored in this.instance
	 */
	this.instance = new google.maps.Map($(selector)[0], this.options);

};

/**
 * Center map on position
 * @param  {number} latitude  Center latitude
 * @param  {number} longitude Center longitude
 */
Map.prototype.center = function (latitude, longitude) {

	var centerPosition = new google.maps.LatLng(latitude, longitude);
	this.instance.panTo(centerPosition);
	return this;

};

/**
 * Center map on geo object
 * @param  {object} geoObject Object with geo positions
 */
Map.prototype.panTo = function (geoObject) {

	if (geoObject.data('latitude') && geoObject.data('longitude'))
		this.center(geoObject.data('latitude'), geoObject.data('longitude'));
	return this;

};

/**
 * Set callback function for event
 * @param  {string} eventName     Event name
 * @param  {function} eventFunction Callback function
 */
Map.prototype.on = function (eventName, eventFunction) {

	google.maps.event.addListener(this.instance, eventName, eventFunction);
	return this;

};

/**
 * Turn off event
 * @param  {string} eventName Event name
 */
Map.prototype.off = function (eventName) {

	google.maps.event.clearListeners(this.instance, eventName);
	return this;

};

/**
 * Call map zoom to show all objects
 * @param {boolean} enable Enable/disable map zoom
 */
Map.prototype.autoZoom = function (enable) {

	return;

	/**
	 * Disable auto zoom - set zoom to options.zoom
	 */
	if (false === enable) {
		this.instance.setZoom(this.options.zoom);
		return this;
	};

	/**
	 * Combine all markers to LatLngBounds
	 */
	var bounds = new google.maps.LatLngBounds();
	this.markers.map(function (marker) {

		bounds.extend(
			new google.maps.LatLng(marker.position.latitude, marker.position.longitude)
		);

	});
	this.instance.fitBounds(bounds);

};

/**
 * Hide current info window
 */
Map.prototype.hideInfoWindow = function () {

	if (this.activeInfoWindow)
		this.activeInfoWindow.hide();

};

/**
 * Clear map and removing all markers
 */
Map.prototype.clearMarkers = function () {

	this.hideInfoWindow();
	this.markers.map(function (marker) {

		marker.setMap(null);

	});
	this.markers = [];

};

/**
 * Add new marker to map
 * @param {object} options Marker options
 */
Map.prototype.addMarker = function (options) {

	var result = new MyWorld.Map.Marker(options);
	result.setMap(this);
	return result;

};

/**
 * Enable map markers event
 * @param  {string} eventName Event name
 */
Map.prototype.enableMarkersEvent = function (eventName) {

	this.markers.map(function (marker) {
		marker.enableEvent(eventName);
	});

};

/**
 * Disable map markers event
 * @param  {string} eventName Event name
 */
Map.prototype.disableMarkersEvent = function (eventName) {

	this.markers.map(function (marker) {
		marker.disableEvent(eventName);
	});

};

/**
 * Add new route point-to-point to map
 * @param {Marker} markerStart Marker - route start
 * @param {Marker} markerStop  Marker - route stop
 * @param {object} options Route options
 */
Map.prototype.addRoute = function (markerStart, markerStop, options) {

	var result = new MyWorld.Map.Route(markerStart, markerStop, options);
	result.setMap(this);
	return result;

};

module.exports = Map;
},{}],12:[function(require,module,exports){
'use strict';

/**
 * Map Marker
 * @param {object} options Marker options
 */
function Marker (options) {

	/**
	 * Default options for Map.Marker
	 */
	var defaults = {
		position: {
			lat: options.latitude,
			lng: options.longitude
		},
		draggable: false
	};
	this.options = $.extend(defaults, options);
	/**
	 * Marker events will be stored separately
	 */
	this._events = {};

	/**
	 * Marker position will be stored separately
	 */
	this.position = {
		latitude: options.latitude,
		longitude: options.longitude
	};

	/**
	 * We don't need store these options
	 */
	delete this.options.latitude;
	delete this.options.longitude;
	delete this.options.infoWindow;

	/**
	 * Standard google.maps.Marker will be stored in this.instance
	 */
	this.instance = new google.maps.Marker(this.options);
	/**
	 * Save Map.Marker as google.maps.Marker owner
	 */
	this.instance._owner = this;

	/**
	 * If options contains "infoWindow" section, we can to create info window immediately
	 */
	if ('undefined' !== typeof options.infoWindow)
		this.createInfoWindow(options.infoWindow);

};

/**
 * Place marker on map
 * @param {Map} map Map-owner
 */
Marker.prototype.setMap = function (map) {

	this.map = map;
	if (map)
		map.markers.push(this);
	this.instance.setMap(map ? map.instance : null);
	return this;

};

/**
 * Set callback function for event
 * @param  {string} eventName     Event name
 * @param  {function} eventFunction Callback function
 */
Marker.prototype.on = function (eventName, eventFunction) {

	this._events[eventName] = eventFunction;
	google.maps.event.addListener(this.instance, eventName, eventFunction);
	return this;

};

/**
 * Turn off event
 * @param {string} eventName Event name
 * @param {boolean} disableEvent Only disable event instead of deleting
 */
Marker.prototype.off = function (eventName, disableEvent) {

	google.maps.event.clearListeners(this.instance, eventName);
	if (true !== disableEvent)
		this._events[eventName] = function () {};
	return this;

};

/**
 * Enable marker event
 * @param  {string} eventName Event name
 */
Marker.prototype.enableEvent = function (eventName) {

	if ('undefined' !== typeof this._events[eventName])
		return this.on(eventName, this._events[eventName]);

};

/**
 * Disable marker event
 * @param  {string} eventName Event name
 */
Marker.prototype.disableEvent = function (eventName) {

	return this.off(eventName, true);

};

/**
 * Execute marker event
 * @param  {string} eventName Event name
 */
Marker.prototype.executeEvent = function (eventName) {

	if ('undefined' !== typeof this._events[eventName])
		this._events[eventName].call(this);

};

/**
 * Create marker info window
 * @param  {object} options Info Window options
 */
Marker.prototype.createInfoWindow = function (options) {

	/**
	 * Create info window for marker
	 */
	this.infoWindow = new MyWorld.Map.InfoWindow(this, options);

	/**
	 * Show info window while mouse over and hide while mouse out
	 * (set options.disableEvents to "true" for turn off this behaviour)
	 */
	if (true !== options.disableEvents) {

		var that = this;

		this.on('mouseover', function () {
			that.infoWindow.show();
		}).on('mouseout', function () {
			that.infoWindow.hide();
		});

	};

};

/**
 * Change marker icon
 * @param {string} path Path to new icon
 */
Marker.prototype.setIcon = function (path) {

	this.instance.setIcon(path);

};

module.exports = Marker;
},{}],13:[function(require,module,exports){
'use strict';

/**
 * Map route
 * @param {Marker} markerOrigin Marker - route start
 * @param {Marker} markerDestination  Marker - route stop
 * @param {object} options Route options
 */
function Route (markerOrigin, markerDestination, options) {

	/**
	 * Default options for Map.Route
	 */
	var defaults = {
		/**
		 * We don't need markers on route
		 */
		suppressMarkers: true,
		polylineOptions: {
			/**
			 * Default route color
			 */
			strokeColor: '#0A161E'
		},
		/**
		 * You can set travelMode you need (walking is default)
		 */
		travelMode: google.maps.TravelMode.WALKING
	};
	options = $.extend(defaults, options);

	this.markers = {
		origin: markerOrigin,
		destination: markerDestination
	};

	/**
	 * Create route instance
	 */
	this.instance = {
		markerOrigin: this.markers.origin,
		markerDestination: this.markers.destination,
		directionsService: new google.maps.DirectionsService,
		directionsDisplay: new google.maps.DirectionsRenderer({
			suppressMarkers: options.suppressMarkers,
			polylineOptions: options.polylineOptions
		})
	};

	/**
	 * Make route
	 */
	var that = this;
	this.instance.directionsService.route({
		origin: {
			lat: that.markers.origin.position.latitude,
			lng: that.markers.origin.position.longitude
		},
		destination: {
			lat: that.markers.destination.position.latitude,
			lng: that.markers.destination.position.longitude
		},
		travelMode: options.travelMode
	}, function (response, status) {
		if (status === google.maps.DirectionsStatus.OK)
			that.instance.directionsDisplay.setDirections(response);
		else
			console.error('Directions request failed due to ' + status);
	});

};

/**
 * Place route on map
 * @param {Map} map Map-owner
 */
Route.prototype.setMap = function (map) {

	this.map = map;
	if (map)
		map.routes.push(this);
	return this;

};

/**
 * Show map route
 */
Route.prototype.show = function () {

	this.instance.directionsDisplay.setMap(this.map.instance);

};

/**
 * Update map route
 * @param  {object} options Route options
 */
Route.prototype.update = function (options) {

	this.markers.origin.instance.setIcon(options.markers.icon);
	this.markers.destination.instance.setIcon(options.markers.icon);

	this.instance.directionsDisplay.setOptions(options);
	this.show();

};

module.exports = Route;
},{}],14:[function(require,module,exports){
'use strict';

/**
 * MyWorld namespace. Create blank object if it doesn't exist
 */
var MyWorld = window.MyWorld || {};

/**
 * Map entities
 */
MyWorld.Map = require('./map/map.class');
MyWorld.Map.Marker = require('./map/marker.class');
MyWorld.Map.InfoWindow = require('./map/infowindow.class');
MyWorld.Map.Route  = require('./map/route.class');

/**
 * [Entities description]
 * @type {Object}
 */

MyWorld.Country = require('./entities/country.class');
MyWorld.City = require('./entities/city.class');
MyWorld.Place = require('./entities/place.class');
MyWorld.Company = require('./entities/company.class');
MyWorld.Vacancy = require('./entities/vacancy.class');
MyWorld.Event = require('./entities/event.class');
MyWorld.News = require('./entities/news.class');
MyWorld.Excursion = require('./entities/excursion.class');

/**
 * Create/replace global namespace
 */
window.MyWorld = MyWorld;
},{"./entities/city.class":1,"./entities/company.class":2,"./entities/country.class":3,"./entities/event.class":4,"./entities/excursion.class":5,"./entities/news.class":7,"./entities/place.class":8,"./entities/vacancy.class":9,"./map/infowindow.class":10,"./map/map.class":11,"./map/marker.class":12,"./map/route.class":13}],15:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],16:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],17:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],18:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":17,"_process":16,"inherits":15}]},{},[14]);
