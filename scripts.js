function initMap() {
	var hitech = {lat: -20.0215545, lng: -48.93485279999999};
	var origin_place_id = null;
	var destination_place_id = "ChIJuTNnIxqxvJQRHYSLgdX7gnE";
	var travel_mode = google.maps.TravelMode.WALKING;

	var mapOptions = {
		zoom: 17,
		center: hitech,
		mapTypeId: google.maps.MapTypeId.HYBRID
	}

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('right-panel'));

	var origin_input = document.getElementById('origin-input');
	var destination_input = hitech;
	var modes = document.getElementById('mode-selector');

	map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

	var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
	origin_autocomplete.bindTo('bounds', map);

	// Sets a listener on a radio button to change the filter type on Places
	// Autocomplete.
	function setupClickListener(id, mode) {
		var radioButton = document.getElementById(id);
		radioButton.addEventListener('click', function() {
			travel_mode = mode;
		});
	}

	setupClickListener('changemode-walking', google.maps.TravelMode.WALKING);
	setupClickListener('changemode-bicycling', google.maps.TravelMode.BICYCLING);
	setupClickListener('changemode-driving', google.maps.TravelMode.DRIVING);

	function expandViewportToFitPlace(map, place) {
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}
	}

	origin_autocomplete.addListener('place_changed', function() {
		var place = origin_autocomplete.getPlace();
		if (!place.geometry) {
			window.alert("Autocomplete's returned place contains no geometry");
			return;
		}
		expandViewportToFitPlace(map, place);

		// If the place has a geometry, store its place ID and route if we have
		// the other place ID
		origin_place_id = place.place_id;
		route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay);
	});

	function route(origin_place_id, destination_place_id, travel_mode,
				 directionsService, directionsDisplay) {
		if (!origin_place_id || !destination_place_id) {
			return;
		}
		directionsService.route({
			origin: {'placeId': origin_place_id},
			destination: {'placeId': destination_place_id},
			travelMode: travel_mode
			}, function(response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
	}

	var marker = new google.maps.Marker({
		position: hitech,
		map: map,
		title: 'Hitech English'
	});
}