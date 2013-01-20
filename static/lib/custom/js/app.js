if(wtot == null) var wtot = {};

wtot.Outing = function(budget, foodPreference, timePreference, distance, location) {
  
  var resourceUrl = "/search";
  var perHeadBudget = budget;
  var foodPreference = foodPreference;
  var timePreference = timePreference
  var distance = distance;
  var latitude = location.latitude;
  var longitude = location.longitude;
  
  var lookup = function() {
    new wtot.APIService().post(
      resourceUrl,
      {
        "foodPreference" : foodPreference,
        "perHeadBudget" : perHeadBudget,
        "timePreference" : timePreference,
        "distance" : distance,
        "latitude" : latitude,
        "longitude" : longitude
      },
      successfulLookup
    );
  };

  var successfulLookup = function(data) {
    alert(data);
  }

  return {
    search : lookup
  };

};

wtot.APIService = function() {
  var _post = function(url, data, successCallback, failureCallback) {
    $.ajax({
       url: url,
       type: 'GET',
       data: data, 
       success: successCallback,
       failure: failureCallback
    });
  };

  return {
    post : _post
  };
};

(function($){
  $(document).ready(function() {

    $('button[name="foodPreference"]').click(function() {
      $("#foodPrefValue").attr('value', $(this).attr('id'));
    });

    $('button[name="visitTime"]').click(function() {
      $("#timePrefValue").attr('value', $(this).attr('id'));
    });

    $("#search").bind('click', function() {
      var budget = $("#costPerHead").attr("value");
      var timePref = $("#timePrefValue").attr("value");
      var foodPref = $("#foodPrefValue").attr("value");
      var distance = $("#distance").attr("value");
      var location = displayedMap.currentUserLocation();
      console.log("budget:" + budget);
      console.log("time:" + timePref);
      console.log("food:" + foodPref);
      console.log("distance:" + distance);
      console.log("location:" + location);
    });
  });
})(jQuery);
