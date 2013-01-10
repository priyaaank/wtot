if(wtot == null) var wtot = {};
if(wtot.map == null) wtot.mapDisplay = {};

wtot.mapDisplay = function(mapHolder) {
  var defaultMapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(mapHolder, defaultMapOptions);
  
  var updateLocation = function(geoPosition) {
    var latitude = geoPosition.coords.latitude;
    var longitude = geoPosition.coords.longitude;
    map.setCenter(new google.maps.LatLng(latitude,longitude));
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
    wtot.userLocation(map.updateLocation).currentLocation()
  });
})(jQuery);
