// Building API query and grab data with d3.json
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", createMarkers);

function createMarkers(response){

	// pull the events from the API response
	var events = response.features
	console.log(events[0])
	//initialize an array to hold quake markers
	var quakemarkers = [];

	//loop through events response to pull event coordinates, place and magnitude
	for (var i=0; i < events.length; i++){
		var coord = [events[i].geometry.coordinates[0],events[i].geometry.coordinates[1]];
		var place = events[i].properties.place;
		var mag = events[i].properties.mag;
	console.log(coord)
	console.log(place)
	console.log(mag)
		// create a marker for each quake and bind popup with quakes information
		var quakemarker = L.marker(coord).bindPopup("<h3>" + place + "<h3><h3> Magnitude: " + mag +"<h3>");

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
	
	
	
	// // Function to determine marker size based on population
	// function markerSize(population) {
	//   return population / 40;
	// }
	
	// // An array containing all of the information needed to create city and state markers
	// var locations = [
	//   {
	//     coordinates: [40.7128, -74.0059],
	//     state: {
	//       name: "New York State",
	//       population: 19795791
	//     },
	//     city: {
	//       name: "New York",
	//       population: 8550405
	//     }
	//   },
	//   {
	//     coordinates: [34.0522, -118.2437],
	//     state: {
	//       name: "California",
	//       population: 39250017
	//     },
	//     city: {
	//       name: "Lost Angeles",
	//       population: 3971883
	//     }
	//   },
	//   {
	//     coordinates: [41.8781, -87.6298],
	//     state: {
	//       name: "Michigan",
	//       population: 9928300
	//     },
	//     city: {
	//       name: "Chicago",
	//       population: 2720546
	//     }
	//   },
	//   {
	//     coordinates: [29.7604, -95.3698],
	//     state: {
	//       name: "Texas",
	//       population: 26960000
	//     },
	//     city: {
	//       name: "Houston",
	//       population: 2296224
	//     }
	//   },
	//   {
	//     coordinates: [41.2524, -95.9980],
	//     state: {
	//       name: "Nebraska",
	//       population: 1882000
	//     },
	//     city: {
	//       name: "Omaha",
	//       population: 446599
	//     }
	//   }
	// ];
	
	// // Define arrays to hold created city and state markers
	// var cityMarkers = [];
	// var stateMarkers = [];
	
	// // Loop through locations and create city and state markers
	// for (var i = 0; i < locations.length; i++) {
	//   // Setting the marker radius for the state by passing population into the markerSize function
	//   stateMarkers.push(
	//     L.circle(locations[i].coordinates, {
	//       stroke: false,
	//       fillOpacity: 0.75,
	//       color: "white",
	//       fillColor: "white",
	//       radius: markerSize(locations[i].state.population)
	//     })
	//   );
	
	//   // Setting the marker radius for the city by passing population into the markerSize function
	//   cityMarkers.push(
	//     L.circle(locations[i].coordinates, {
	//       stroke: false,
	//       fillOpacity: 0.75,
	//       color: "purple",
	//       fillColor: "purple",
	//       radius: markerSize(locations[i].city.population)
	//     })
	//   );
	// }
	