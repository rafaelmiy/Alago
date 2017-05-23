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
  
  var iconBase = '../images/pins/';
  var icons = {
    blocked: {
      icon: iconBase + 'red_pin.png'
    },
    ok: {
      icon: iconBase + 'blue_pin.png'
    },
    old: {
      icon: iconBase + 'grey_pin.png'
    }
  };
  
  
  var features = [
    {
      position: new google.maps.LatLng(-23.598566599999998, -46.6560601),
      type: 'block'
    }, {
      position: new google.maps.LatLng(-23.598566599999998, -47.6560601),
      type: 'ok'
    }, {
      position: new google.maps.LatLng(-23.598566599999998, -48.6560601),
      type: 'old'
    }
  ];
  
  var iconBase = '../images/pins/';
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: iconBase + 'blue_pin.png'
  });
  
}


