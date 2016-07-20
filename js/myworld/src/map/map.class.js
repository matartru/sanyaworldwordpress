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