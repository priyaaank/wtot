if(wtot == null) var wtot = {};
if(wtot.map == null) wtot.mapDisplay = {};

wtot.mapDisplay = function(mapHolder) {

  var userLocationMarker;

  var defaultMapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(mapHolder, defaultMapOptions);

  google.maps.event.addListener(map, 'click', function(event) {
    updateUserMarkerLocation(event.latLng);
  });
  
  var updateLocation = function(geoPosition) {
    var latitude = geoPosition.coords.latitude;
    var longitude = geoPosition.coords.longitude;
    var location = new google.maps.LatLng(latitude,longitude)
    moveNewLocationToCenter(location);
    addMarkerAtCenter();
  };

  var addMarkerAtCenter = function() {
    userLocationMarker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      title: 'You are here'
    });
  };

  var updateUserMarkerLocation = function(geoLocation) {
    userLocationMarker.setPosition(geoLocation);
    moveNewLocationToCenter(geoLocation);
  };

  var moveNewLocationToCenter = function(location) {
    map.panTo(location)
    map.setZoom(16);
  };

  return {
    updateLocation : updateLocation
  };
};

wtot.userLocation = function(callback) {
  var currentLocation = function() {
    navigator.geolocation.getCurrentPosition(callback);
  };

  return {
    currentLocation : currentLocation
  };
};


;(function($){
  $(document).ready(function() {
    map = wtot.mapDisplay(document.getElementById("map_canvas"));
    wtot.userLocation(map.updateLocation).currentLocation();
  });
})(jQuery);
