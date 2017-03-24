var mapOptions = {
    zoom: 13,
    center: {lat: 48.866667, lng: 2.333333},
    disableDefaultUI: true
};

var map = new google.maps.Map(document.getElementById("map"), mapOptions);

/**
 * 
 * @param {String} address address to provide in order to get the geocode and return a marker on the map.
 */
function setMarker() {
    var address = document.getElementById('check-search').value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function checkValidityToAddSpot() {
    var address = document.getElementById('addressAddSpot').value;
    var btn = document.getElementById('training-add-spot');

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      btn.style.display = "inline";
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert("Veuillez entrer une addresse valide.");
      btn.style.display = "none";
    }
  });
}

function initAllGroups(address, name) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var infowindow = new google.maps.InfoWindow({
        content: name + ": Description soon"
      });
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        title: name,
        icon: "img/kabuki.png"
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
       });
    } else {
    }
  });
}