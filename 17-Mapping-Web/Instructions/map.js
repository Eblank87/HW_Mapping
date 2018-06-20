// Creating map object

var map = L.map("map", {
    center: [50.0, -0.0],
    zoom: 2
  });

// Adding tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		accessToken: 'pk.eyJ1IjoiZWJsYW5rIiwiYSI6ImNqaWR2eWF1NjA2N2oza212bzFzbjV0ZnMifQ.7Ksa3rUTdYPCWrQETdj2nw',
		id: 'mapbox.comic',
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	})
	.addTo(map);