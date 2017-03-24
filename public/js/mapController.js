
/**
 * Will Init the map
 */
var mapOptions = {
    zoom: 13,
    center: {lat: 48.866667, lng: 2.333333},
    disableDefaultUI: true
};

var map = new google.maps.Map(document.getElementById("map"), mapOptions);

// END init map

/**
 * Will set a marker thanks to the id in the view.
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

/**
 * Will check Validity to add a spot or not
 * @param {NoParam}
 */
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

/**
 * Method to be used in the call when the for statement of backend side is provided.
 * @param {String} address indicate the address of the group
 * @param {String} name indicate the name of the group 
 */
function initAllGroups(address, name, img) {
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
        icon: img
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
       });
    } else {
    }
  });
}

function centerMap(event) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': event.srcElement.getAttribute('data-address')}, function(results, status) {
  map.setCenter(results[0].geometry.location);
  if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
    }
  });
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});