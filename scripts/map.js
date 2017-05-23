var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: new google.maps.LatLng(-23.5437803, -46.6491332),
    mapTypeId: 'roadmap'
  });
 var infoWindow = new google.maps.InfoWindow({map: map});
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
  var iconBase = 'https://rafaelmiy.github.io/Alago/images/pins/';
  var icons = {
    blocked: {
      icon: 'https://rafaelmiy.github.io/Alago/images/pins/red_pin.png'
    },
    ok: {
      icon: 'https://rafaelmiy.github.io/Alago/images/pins/blue_pin.png'
    },
    old: {
      icon: 'https://rafaelmiy.github.io/Alago/images/pins/grey_pin.png'
    }
  };

var marker = null;

function autoUpdate() {
  navigator.geolocation.getCurrentPosition(function(position) {  
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint);
    }
    else {
      // Marker does not exist - Create it
      marker = new google.maps.Marker({
        position: newPoint,
        map: map,
        icon: 'https://rafaelmiy.github.io/Alago/images/pins/blue_pin.png'
      });
    }

    // Center the map on the new position
    //map.setCenter(newPoint);
  }); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoUpdate, 5000);
}

autoUpdate();
  var features = [
    {
      position: new google.maps.LatLng(-23.598566599999998, -46.6560601),
      type: 'block'
    }, {
      position: new google.maps.LatLng(-23.598566599999998, -46.6550601),
      type: 'block'
    }, {
      position: new google.maps.LatLng(-23.598566599999998, -46.6540601),
      type: 'ok'
    }, {
      position: new google.maps.LatLng(-23.598566599999998, -46.6530601),
      type: 'old'
    }
  ];

  // Create markers.
  features.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    });
  });
}
