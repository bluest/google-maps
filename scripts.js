function initMap() {
	var mapOptions = {
		zoom: 50,
		center: {lat: -20.0215409, lng: -48.9354805},
		mapTypeId: google.maps.MapTypeId.HYBRID
	}

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}