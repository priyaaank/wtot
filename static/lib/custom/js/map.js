if(wtot == null) var wtot = {};
var displayedMap = null;

wtot.userLocation = function(callback) {
  var currentLocation = function() {
    navigator.geolocation.getCurrentPosition(callback);
  };

  return {
    currentLocation : currentLocation
  };
};

wtot.MapDisplay = function(mapHolder) {

  var userLocationMarker = null;
  var userLocationLocator = wtot.userLocation;
  var currentLatitude;
  var currentLongitude;

  var defaultMapOptions = {
    //initial location is that of pune
    center: new google.maps.LatLng(18.5236, 73.8478),
    zoom: 16,
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
    updateUserMarkerLocation(location);
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
    currentLatitude = geoLocation.lat()
    currentLongitude = geoLocation.lng();
  };

  var moveNewLocationToCenter = function(location) {
    map.panTo(location)
  };

  var currentUserLocation = function() {
    return {
      latitude : currentLatitude,
      longitude : currentLongitude
    };
  };

  setTimeout(function() {
    wtot.userLocation(updateLocation).currentLocation();
  }, 1000);

  return {
    currentUserLocation : currentUserLocation
  };
};



;(function($){
  $(document).ready(function() {
    displayedMap = new wtot.MapDisplay(document.getElementById("map_canvas"));
  });
})(jQuery);
