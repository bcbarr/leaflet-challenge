// Store our API endpoint inside queryUrl
// API key
// const API_KEY = "pk.eyJ1IjoiYmNiYXJyIiwiYSI6ImNrYzQ1YThmaDA0bGkyenFzbnI2Y3pyaGkifQ.qjU9bykXg-Rcr6HG9VNfeg";


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"



// Perform a GET request to the query URL
d3.json(url, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data.features[0].geometry.coordinates)
  console.log(data.features)
  // createFeatures(data.features);
  createCircles(data.features)
});



// function createFeatures(earthquakeData) {

// //   // // Define a function we want to run once for each feature in the features array
// //   // // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     console.log(layer[0]);
//     layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//     // layer.circle(feature.geometry.coordinates, {
//     //   fillOpacity: 0.75,
//     //   color: "white",
//     //   fillColor: "purple",
//     //   // Setting our circle's radius equal to the output of our markerSize function
//     //   // This will make our marker's size proportionate to its population
//     //   radius: feature.properties.mag
//     // })
//   }

//   // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature,
//   });

//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }



function createCircles(earthquakeData) {
  var magnitudes = []
  var circles = []
  for (var i = 0; i < earthquakeData.length; i++) {
    console.log(earthquakeData[0].geometry.coordinates.slice(0,2))
    magnitudes.push(earthquakeData[i].properties.mag)
    
    circles.push(
      L.circle(earthquakeData[i].geometry.coordinates.slice(0,2), {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: "white",
        radius: earthquakeData[i].properties.mag *10,
      }));
      
      var earthquakes2 = L.geoJSON(earthquakeData, {

      })
// })
// createMap(earthquakes2, circles)
// }
}
console.log(earthquakeData[0].geometry.coordinates.slice(0,2))
createMap(circles)
console.log(circles)
console.log(magnitudes)
}

//   for (var i = 0; i < feature.length; i++) {
//     L.circle(feature[i].geometry.coordinates, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "purple",
//       // Setting our circle's radius equal to the output of our markerSize function
//       // This will make our marker's size proportionate to its population
//       radius: feature[i].properties.mag
//     }).bindPopup("<h1>" + feature[i].properties.mag + "</h1> <hr> <h3>Population: " + feature[i].properties.mag + "</h3>").addTo(myMap);
//   }
 


// }

function createMap(circles) {



  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  var circlequakes = L.layerGroup(circles);

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Earthquakes": circlequakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, circlequakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
