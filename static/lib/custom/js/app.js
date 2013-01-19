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
    $("#search").bind('click', function() {
      //var budget = $("#costPerHead").attr("value");
      //var foodPref = $("name='foodPreference'");
      //var timePref = $("");
      //var distance = $("");
      //var location = $("");
      console.log(displayedMap.currentUserLocation());
    });
  });
})(jQuery);
