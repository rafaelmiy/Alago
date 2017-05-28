var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: new google.maps.LatLng(-23.5437803, -46.6491332),
    mapTypeId: 'terrain'
  });
 //var infoWindow = new google.maps.InfoWindow({map: map});
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

      //infoWindow.setPosition(pos);
      //infoWindow.setContent('Você');
      map.setCenter(pos);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
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

// var geoloccontrol = new klokantech.GeolocationControl(map, mapMaxZoom);
  
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
        icon: 'https://rafaelmiy.github.io/Alago/images/pins/gps_pin.png'
      });
    }

    // Center the map on the new position
    //map.setCenter(newPoint);
  }); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoUpdate, 5000);
}

autoUpdate();

  var features = [];

  firebase.database().ref("pontos").on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      var now = new Date().getTime();
      var ponto = data.val();
      features.push(
        {
          position: new google.maps.LatLng(ponto.lat, ponto.lon),
          type: ((now-ponto.time)/(1000*60))<180?ponto.type:"old"
        },
      );
    });

    // Create markers.
    features.forEach(function(feature) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
      });
    });
  });
}
$( document ).ready(function() {

    $('#alagoModal').modal('show');

});
var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
    lineSelector = select('#lineSelector'),
    hitArea = select('#hitArea'),
    hitL = select('#hitL'),
    hitR = select('#hitR'),
    base = select('#base'),
    selectorColorArray = ['#4CAF50', '#F44336']


TweenMax.set('svg', {
  visibility: 'visible'
})

var introTl = new TimelineMax({paused:false, onComplete:createInteraction});
introTl.from(base, 0.4, {
  strokeWidth:0,
  delay:1
})
.from(lineSelector, 0.2, {
 strokeWidth:0
},'-=0.2')
.from(base, 0.4, {
  attr:{
    x1:400,
    x2:400
  },
  ease:Anticipate.easeIn
  
})
.from(lineSelector, 0.4, {
  attr:{
    x1:400,
    x2:400
  },
  ease:Anticipate.easeIn
},'-=0.4')

var tl = new TimelineMax({paused:true});
function createInteraction(){
  tl.to(lineSelector, 0.5, {
    attr:{
      x2:450
    },
    strokeWidth:30,
    ease:Power1.easeIn
  })
  .from(hitL, 1, {
    attr:{
      r:30
    },
    alpha:1,
    immediateRender:false,
    ease:Power1.easeOut
  },'-=0.5')
  .to(lineSelector, 1, {
    attr:{
      x1:450
    },
    strokeWidth:60,
    stroke:selectorColorArray[0],
    ease:Elastic.easeOut.config(1, 0.59)
  },'-=0.5')
  .to(base, 0.15,{
    attr:{
      x2:460
    },
    repeat:1,
    yoyo:true
  },'-=0.85')
  .to(base, 0.15,{
    attr:{
      x1:348
    },
    repeat:1,
    yoyo:true
  },'-=0.6')

  .addPause()
  .to(lineSelector, 0.5, {
    attr:{
      x1:350
    },
    strokeWidth:30,
    ease:Power1.easeIn
  })
  .from(hitR, 1, {
    attr:{
      r:30
    },
    alpha:1,
    immediateRender:false,
    ease:Power1.easeOut
  },'-=0.5')
  .to(lineSelector, 1, {
    attr:{
      x2:350
    },
    strokeWidth:60,
    stroke:selectorColorArray[1],
    ease:Elastic.easeOut.config(1, 0.59)
  },'-=0.5')
  .to(base, 0.15,{
    attr:{
      x1:340
    },
    repeat:1,
    yoyo:true
  },'-=0.85')
  .to(base, 0.15,{
    attr:{
      x2:452
    },
    repeat:1,
    yoyo:true
  },'-=0.6')

  hitArea.onclick = function(){

    if(tl.time() == tl.duration()){
      tl.play(0)
    } else {
      tl.play()
    }
  }

  hitArea.ontouchstart = hitArea.onclick;

  tl.timeScale(1.8);
  tl.progress(1);
  
}


