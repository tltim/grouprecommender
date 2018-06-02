// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow, placesService;
var recUL = document.getElementById("recNames");
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 14
  });
  infoWindow = new google.maps.InfoWindow;


  // Try HTML5 geolocation get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //Current location
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //Set map position to center on current location
      infoWindow.setPosition(pos);
      infoWindow.setContent('Current Location');
      infoWindow.open(map);
      map.setCenter(pos);

      //Make request to google places API for nearby places
      var request = {
        location: pos,
        radius: '500',
        type: ['restaurant']
      };
      placesService = new google.maps.places.PlacesService(map);
      placesService.nearbySearch(request, handleRecommendations);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

//Callback handler to get places API results and then filter them 
function handleRecommendations(results, status) {
  console.log("hello");
  var queryString = decodeURIComponent(window.location.search);
  console.log(queryString);
  queryString = queryString.substring(1);
  var queries = queryString.split("&");
  console.log(queries);

  var history1 = JSON.parse(queries[0]);
  var history2 = JSON.parse(queries[1]);
  var history3 = JSON.parse(queries[2]);

  console.log(history1);
  console.log(history2);
  console.log(history3);


for (var i = 0; i < queries.length; i++)
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      if(!history1.includes(results[i].name) && !history2.includes(results[i].name) && !history3.includes(results[i].name)) {
        var place = results[i];
        createMarker(results[i]);
        //Add to recommendation list on UI
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(results[i].name));
        li.setAttribute("id", results[i].name);
        recUL.appendChild(li);
      }
    }
  }
}

function createMarker(place) {
  console.log(place.name)

  var marker = new google.maps.Marker({
    // label: place.name,
    title: place.name,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
    map: map
  });

  //When clicking reveal in list which recommendation it is
  marker.addListener('click', showRecommendation);
}

//Highlight or show which restaurant it is
function showRecommendation(){
  console.log(this.getTitle());
  document.getElementById(this.getTitle()).style.color = "red";
}
