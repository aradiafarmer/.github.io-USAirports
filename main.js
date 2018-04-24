// 1. Create a map object.
var mymap = L.map('map', {
    crs: mycrs,
    center: [40.310032, -100.922839], // somewhere in Nebraska
    zoom: 4.5, // is this a good zoom level?
    maxZoom: 10,
    minZoom: 3,
    detectRetina: true});

// 2. Add a base map.
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

// 3. Add airports GeoJSON Data
var cellAirports = null; // Null variable that will hold cell tower data

// 3.a use a set of colors from colorbrewer
var colors = chroma.scale('Purples').mode('lch').colors(9); // number of colors probably needs changed

// 3.b Get GeoJSON and put on it on the map when it loads
cellAirports= L.geoJson.ajax("assets/cell_airports.geojson", {

