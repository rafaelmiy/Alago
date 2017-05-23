
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.5437803, lng: -46.6491332},
    zoom: 16
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var lat = pos.lat;
      var long = pos.lng;

      sessionStorage.setItem('lat', lat);
      sessionStorage.setItem('long', long);

      infoWindow.setPosition(pos);
      infoWindow.setContent('Você');
      map.setCenter(pos);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}


// Setting geolocation at sessionStorage
var lat = sessionStorage.getItem('lat');
var long = sessionStorage.getItem('long');

var Weather = "https://miyamotonode.mybluemix.net/weather/wu2/"+lat+"/"+long+"";

$.ajax({
  url : Weather,
  dataType : "jsonp",
  success : function(data) {
    // Get all informations
    var data = data.current_observation;

    var location = data.display_location.full;
    var iconURL = data.icon_url;
    var temp = data.temp_c;
    var humidity = data.relative_humidity;
    var wind = data.wind_kph;
    var realfeel = data.feelslike_c;
    var precip = data.precip_today_metric;
    
    // Set all informations
    $("#weather-location").html(location);
    $("#weather-icon").attr("src",iconURL);
    $("#weather-temp").html(temp);
    $("#weather-humidity").html(humidity);
    $("#weather-wind").html(wind);
    $("#weather-realfeel").html(realfeel);
    $("#weather-precip").html(precip);
  }
});
