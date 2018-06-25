// Building API query and grab data with d3.json
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", createMarkers);

function createMarkers(response){

	// pull the events from the API response
	var events = response.features
	console.log(events[0])
	//initialize an array to hold quake markers
	var quakemarkers = [];
	// Define a markerSize function that will give each earthquake a different radius based on its magnitude
	function markerSize(mag) {
	return mag * 40000;
  	}

	//loop through events response to pull event coordinates, place and magnitude
	for (var i=0; i < events.length; i++){
		var coord = [events[i].geometry.coordinates[0],events[i].geometry.coordinates[1]];
		var place = events[i].properties.place;
		var mag = events[i].properties.mag;
	console.log(coord)
	console.log(place)
	console.log(mag)
		// create a marker for each quake and bind popup with quakes information
		var quakemarker = L.circle(coord,{
		stroke:false,
		fillOpacity: 0.75,
		color:"red",
		fillColor:"red",
		radius: markerSize(mag)
		}).bindPopup("<h3>" + place + "<h3><h3> Magnitude: " + mag +"<h3>");

		quakemarkers.push(quakemarker);
	}

	var quakelayers = L.layerGroup(quakemarkers);
	
		// Adding tile layer
		var earth = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		accessToken: 'pk.eyJ1IjoiZWJsYW5rIiwiYSI6ImNqaWR2eWF1NjA2N2oza212bzFzbjV0ZnMifQ.7Ksa3rUTdYPCWrQETdj2nw',
		id: 'mapbox.comic',
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',	
	});
		
		// create a baseMaps object to hold the lightmap layer
		var basemaps = {"Light Map": earth};
	
		  // create an overlayMaps object to hold the quake layer
		var overlayMaps = {"Quake Events": quakelayers};
	
		var map = L.map("map", {
		center: [50.0, -0.0],
		zoom: 2,
		layers: [earth, quakelayers]
		  });
		  L.control.layers(basemaps, overlayMaps).addTo(map);
		
		}
	
	